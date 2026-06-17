"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, CheckCircle, Image as ImageIcon, Type, LayoutTemplate, Upload, Map, ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import Editor from 'react-simple-wysiwyg';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadingImage, setUploadingImage] = useState(null);
  const [expandedGuideId, setExpandedGuideId] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "cms_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  const handleImageUpload = async (file, section, arrayName, index, field) => {
    if (!file) return;
    
    setUploadingImage(`${section}-${index}-${field}`);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        const result = await res.json();
        updateArrayItem(section, arrayName, index, field, result.url);
      } else {
        console.error('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploadingImage(null);
    }
  };

  useEffect(() => {
    fetch('/api/cms/data')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load CMS data:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section, arrayName, index, field, value) => {
    setData(prev => {
      if (!arrayName) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return {
          ...prev,
          [section]: newArray
        };
      }

      const newArray = [...prev[section][arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: newArray
        }
      };
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ animation: 'spin 1s linear infinite', color: '#0d9488' }} size={32} />
      </div>
    );
  }

  if (!data) return <div style={{ padding: '32px', color: '#ef4444' }}>Error loading CMS data.</div>;

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: LayoutTemplate },
    { id: 'intro', label: 'About/Intro', icon: Type },
    { id: 'experiences', label: 'Experiences', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: Type },
    { id: 'areaGuides', label: 'Area Guides', icon: Map },
    { id: 'contact', label: 'Contact Details', icon: Type },
  ];

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.pageTitle}>Content Editor</h1>
          <p className={styles.pageSubtitle}>Manage your website's content in real-time.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '8px 16px', background: 'transparent', 
              border: '1px solid #e5e7eb', borderRadius: '6px', 
              color: '#4b5563', cursor: 'pointer', fontWeight: 500 
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={styles.saveBtn}
          >
            {saving ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={18} />}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className={styles.successMessage}>
          <CheckCircle size={20} />
          <span>Website content updated successfully!</span>
        </div>
      )}

      <div className={styles.editorCard}>
        <div className={styles.tabsContainer}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.editorContent}>
          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <div style={{ maxWidth: '768px' }}>
              <h2 className={styles.sectionTitle}>Hero Section Content</h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Eyebrow Text</label>
                  <input 
                    type="text" 
                    value={data.hero.eyebrow} 
                    onChange={e => updateField('hero', 'eyebrow', e.target.value)}
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Title Part 1</label>
                      <input 
                        type="text" 
                        value={data.hero.title} 
                        onChange={e => updateField('hero', 'title', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Ampersand/Symbol</label>
                      <input 
                        type="text" 
                        value={data.hero.ampersand} 
                        onChange={e => updateField('hero', 'ampersand', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Title Part 2</label>
                      <input 
                        type="text" 
                        value={data.hero.title2} 
                        onChange={e => updateField('hero', 'title2', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Subtitle</label>
                  <input 
                    type="text" 
                    value={data.hero.subtitle} 
                    onChange={e => updateField('hero', 'subtitle', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Intro Section Tab */}
          {activeTab === 'intro' && (
            <div style={{ maxWidth: '768px' }}>
              <h2 className={styles.sectionTitle}>About / Intro Section</h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Eyebrow Text</label>
                  <input 
                    type="text" 
                    value={data.intro.eyebrow} 
                    onChange={e => updateField('intro', 'eyebrow', e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Main Title</label>
                  <input 
                    type="text" 
                    value={data.intro.title} 
                    onChange={e => updateField('intro', 'title', e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description Paragraph 1</label>
                  <textarea 
                    rows={4}
                    value={data.intro.description1} 
                    onChange={e => updateField('intro', 'description1', e.target.value)}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description Paragraph 2</label>
                  <textarea 
                    rows={3}
                    value={data.intro.description2} 
                    onChange={e => updateField('intro', 'description2', e.target.value)}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Button Text</label>
                      <input 
                        type="text" 
                        value={data.intro.buttonText} 
                        onChange={e => updateField('intro', 'buttonText', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Side Vertical Text</label>
                      <input 
                        type="text" 
                        value={data.intro.verticalText} 
                        onChange={e => updateField('intro', 'verticalText', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experiences Tab */}
          {activeTab === 'experiences' && (
            <div style={{ maxWidth: '896px' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 className={styles.sectionTitle}>Experiences Section Header</h2>
                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Eyebrow Text</label>
                      <input 
                        type="text" 
                        value={data.experiences.eyebrow} 
                        onChange={e => updateField('experiences', 'eyebrow', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Main Title</label>
                      <input 
                        type="text" 
                        value={data.experiences.title} 
                        onChange={e => updateField('experiences', 'title', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className={styles.sectionTitle} style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>Experience Items</h2>
                <div>
                  {data.experiences.items.map((item, index) => (
                    <div key={item.id} className={styles.arrayItem}>
                      <div className={styles.formCol}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Title</label>
                          <input 
                            type="text" 
                            value={item.title} 
                            onChange={e => updateArrayItem('experiences', 'items', index, 'title', e.target.value)}
                            className={styles.input}
                          />
                        </div>
                      </div>
                      <div className={styles.formCol}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Image</label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt="" 
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb' }} 
                              />
                            )}
                            <label className={styles.uploadBtn} style={{ flex: 1, padding: '8px' }}>
                              {uploadingImage === `experiences-${index}-image` ? (
                                <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Uploading...</>
                              ) : (
                                <><Upload size={16} style={{ marginRight: '8px' }} /> {item.image ? 'Change Image' : 'Upload Image'}</>
                              )}
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }}
                                onChange={e => handleImageUpload(e.target.files?.[0], 'experiences', 'items', index, 'image')}
                                disabled={uploadingImage === `experiences-${index}-image`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div style={{ maxWidth: '896px' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 className={styles.sectionTitle}>Testimonials Header</h2>
                <div className={styles.formGroup} style={{ maxWidth: '400px' }}>
                  <label className={styles.label}>Main Title</label>
                  <input 
                    type="text" 
                    value={data.testimonials.title} 
                    onChange={e => updateField('testimonials', 'title', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.automatedNotice}>
                <h2 className={styles.automatedTitle}>Reviews are Automated</h2>
                <p className={styles.automatedText}>
                  Guest reviews are now automatically fetched directly from your OwnerRez account (which aggregates Airbnb and VRBO reviews).
                  To manage which reviews appear, please manage them directly within your OwnerRez dashboard.
                </p>
              </div>
            </div>
          )}

          {/* Area Guides Tab */}
          {activeTab === 'areaGuides' && (
            <div style={{ maxWidth: '896px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Area Guides</h2>
                <button 
                  onClick={() => {
                    const newId = data.areaGuides && data.areaGuides.length > 0 ? Math.max(...data.areaGuides.map(g => g.id)) + 1 : 1;
                    setData(prev => ({
                      ...prev,
                      areaGuides: [
                        {
                          id: newId,
                          title: "New Guide",
                          slug: "new-guide",
                          excerpt: "",
                          readingTime: "5 min read",
                          date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                          coverImage: "",
                          content: ""
                        },
                        ...(prev.areaGuides || [])
                      ]
                    }));
                  }}
                  className={styles.saveBtn}
                  style={{ padding: '6px 12px', fontSize: '0.875rem' }}
                >
                  + Add New Guide
                </button>
              </div>

              <div>
                {data.areaGuides?.map((guide, index) => (
                  <div key={guide.id} className={styles.arrayItem} style={{ flexDirection: 'column', gap: expandedGuideId === guide.id ? '20px' : '0' }}>
                    <div 
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '4px 0' }}
                      onClick={() => setExpandedGuideId(expandedGuideId === guide.id ? null : guide.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {expandedGuideId === guide.id ? <ChevronDown size={20} color="#115e59" /> : <ChevronRight size={20} color="#115e59" />}
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#115e59' }}>{guide.title || 'New Guide'}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this guide?')) {
                            setData(prev => {
                              const newArray = [...prev.areaGuides];
                              newArray.splice(index, 1);
                              return { ...prev, areaGuides: newArray };
                            });
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
                      >
                        Remove
                      </button>
                    </div>

                    {expandedGuideId === guide.id && (
                    <div className={styles.formGrid} style={{ marginTop: '16px' }}>
                      <div className={styles.formRow}>
                        <div className={styles.formCol}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Title</label>
                            <input 
                              type="text" 
                              value={guide.title} 
                              onChange={e => updateArrayItem('areaGuides', null, index, 'title', e.target.value)}
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div className={styles.formCol}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Slug (URL friendly)</label>
                            <input 
                              type="text" 
                              value={guide.slug} 
                              onChange={e => updateArrayItem('areaGuides', null, index, 'slug', e.target.value)}
                              className={styles.input}
                              style={{ fontFamily: 'monospace' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.formCol}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Reading Time</label>
                            <input 
                              type="text" 
                              value={guide.readingTime} 
                              onChange={e => updateArrayItem('areaGuides', null, index, 'readingTime', e.target.value)}
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div className={styles.formCol}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Date</label>
                            <input 
                              type="text" 
                              value={guide.date} 
                              onChange={e => updateArrayItem('areaGuides', null, index, 'date', e.target.value)}
                              className={styles.input}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Cover Image</label>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          {guide.coverImage && (
                            <img 
                              src={guide.coverImage} 
                              alt="" 
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb' }} 
                            />
                          )}
                          <label className={styles.uploadBtn} style={{ padding: '8px 16px' }}>
                            {uploadingImage === `areaGuides-${index}-coverImage` ? (
                              <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} /> Uploading...</>
                            ) : (
                              <><Upload size={16} style={{ marginRight: '8px' }} /> {guide.coverImage ? 'Change Image' : 'Upload Image'}</>
                            )}
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }}
                              onChange={e => handleImageUpload(e.target.files?.[0], 'areaGuides', null, index, 'coverImage')}
                              disabled={uploadingImage === `areaGuides-${index}-coverImage`}
                            />
                          </label>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Excerpt</label>
                        <textarea 
                          rows={2}
                          value={guide.excerpt} 
                          onChange={e => updateArrayItem('areaGuides', null, index, 'excerpt', e.target.value)}
                          className={styles.textarea}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Content</label>
                        <Editor
                          value={guide.content}
                          onChange={e => updateArrayItem('areaGuides', null, index, 'content', e.target.value)}
                          containerProps={{ style: { height: '300px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px' } }}
                        />
                      </div>
                    </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div style={{ maxWidth: '768px' }}>
              <h2 className={styles.sectionTitle}>Contact Section Content</h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Eyebrow Text</label>
                      <input 
                        type="text" 
                        value={data.contact.eyebrow} 
                        onChange={e => updateField('contact', 'eyebrow', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Main Title</label>
                      <input 
                        type="text" 
                        value={data.contact.title} 
                        onChange={e => updateField('contact', 'title', e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description Paragraph</label>
                  <textarea 
                    rows={4}
                    value={data.contact.description} 
                    onChange={e => updateField('contact', 'description', e.target.value)}
                    className={styles.textarea}
                  />
                </div>
                <div className={styles.formRow} style={{ borderTop: '1px solid #f3f4f6', paddingTop: '24px', marginTop: '8px' }}>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Contact Email</label>
                      <input 
                        type="email" 
                        value={data.contact.email} 
                        onChange={e => updateField('contact', 'email', e.target.value)}
                        className={styles.input}
                        style={{ fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                  <div className={styles.formCol}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Contact Phone</label>
                      <input 
                        type="text" 
                        value={data.contact.phone} 
                        onChange={e => updateField('contact', 'phone', e.target.value)}
                        className={styles.input}
                        style={{ fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
