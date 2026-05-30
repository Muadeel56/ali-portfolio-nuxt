<template>
  <div>
    <h1 class="page-title">Videos</h1>

    <!-- Upload form -->
    <div class="form-card">
      <h2 class="form-title">Upload video</h2>
      <form class="upload-form" @submit.prevent="uploadVideo">
        <div class="field">
          <label>Video file <span class="hint">(MP4, MOV, WebM — max 500 MB)</span></label>
          <input ref="fileInput" type="file" accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm" required @change="onFileChange" />
        </div>
        <div class="fields-row">
          <div class="field">
            <label>Title</label>
            <input v-model="form.title" type="text" required placeholder="Wedding Highlight — Ali & Sara" />
          </div>
          <div class="field">
            <label>Caption</label>
            <input v-model="form.caption" type="text" placeholder="March 2025 · Lahore" />
          </div>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="form.description" rows="3" placeholder="Full-day wedding coverage…" />
        </div>

        <div v-if="progress !== null" class="progress-wrap">
          <div class="progress-bar" :style="{ width: progress + '%' }" />
          <span class="progress-label">{{ progress }}%</span>
        </div>

        <p v-if="uploadError" class="error-msg">{{ uploadError }}</p>
        <p v-if="uploadSuccess" class="success-msg">Video uploaded successfully.</p>

        <button type="submit" class="btn-primary" :disabled="uploading">
          {{ uploading ? 'Uploading…' : 'Upload' }}
        </button>
      </form>
    </div>

    <!-- List -->
    <div class="videos-list">
      <div v-for="v in videos" :key="v.id" class="video-row">
        <video :src="v.url" class="video-thumb" muted preload="metadata" />
        <div class="video-info">
          <p class="video-title">{{ v.title || v.key }}</p>
          <p v-if="v.caption" class="video-caption">{{ v.caption }}</p>
          <p v-if="v.description" class="video-desc">{{ v.description }}</p>
          <p class="video-meta">{{ formatSize(v.size) }} · {{ formatDate(v.uploadedAt) }}</p>
        </div>
      </div>
      <p v-if="!videos.length" class="empty">No videos uploaded yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Video {
  id: number
  key: string
  url: string
  title: string
  caption: string
  description: string
  size: number
  uploadedAt: string
}

const videos = ref<Video[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const form = reactive({ title: '', caption: '', description: '' })
const uploading = ref(false)
const progress = ref<number | null>(null)
const uploadError = ref('')
const uploadSuccess = ref(false)

const load = async () => {
  videos.value = await $fetch<Video[]>('/api/admin/videos')
}

onMounted(load)

const onFileChange = (e: Event) => {
  selectedFile.value = (e.target as HTMLInputElement).files?.[0] ?? null
}

const uploadVideo = async () => {
  if (!selectedFile.value) return
  uploadError.value = ''
  uploadSuccess.value = false
  uploading.value = true
  progress.value = 0

  try {
    const fd = new FormData()
    fd.append('file', selectedFile.value)
    fd.append('title', form.title)
    fd.append('caption', form.caption)
    fd.append('description', form.description)

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/admin/videos/upload')
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) progress.value = Math.round((e.loaded / e.total) * 100)
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve()
        else {
          const msg = JSON.parse(xhr.responseText)?.statusMessage ?? 'Upload failed.'
          reject(new Error(msg))
        }
      }
      xhr.onerror = () => reject(new Error('Network error.'))
      xhr.send(fd)
    })

    form.title = ''
    form.caption = ''
    form.description = ''
    if (fileInput.value) fileInput.value.value = ''
    selectedFile.value = null
    uploadSuccess.value = true
    await load()
  }
  catch (e: any) {
    uploadError.value = e?.message ?? 'Upload failed.'
  }
  finally {
    uploading.value = false
    progress.value = null
  }
}

const formatSize = (bytes: number) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

const formatDate = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<style scoped>
.page-title {
  font-family: var(--serif);
  font-size: 1.75rem;
  color: var(--text);
  margin: 0 0 var(--space-06);
}

.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-05);
  margin-bottom: var(--space-06);
}

.form-title {
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dim);
  margin: 0 0 var(--space-04);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
}

.fields-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-04);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-01);
}

label {
  font-size: 0.82rem;
  color: var(--text-dim);
  font-family: var(--sans);
}

.hint {
  color: var(--muted);
  font-size: 0.75rem;
}

input[type="text"], textarea {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-02) var(--space-03);
  color: var(--text);
  font-family: var(--sans);
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: border-color var(--transition-base);
}

input[type="text"]:focus, textarea:focus {
  border-color: var(--gold);
}

input[type="file"] {
  color: var(--text-dim);
  font-family: var(--sans);
  font-size: 0.85rem;
}

.progress-wrap {
  position: relative;
  background: var(--border);
  border-radius: 4px;
  height: 6px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--gold);
  border-radius: 4px;
  transition: width 0.2s;
}

.progress-label {
  display: block;
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 4px;
  font-family: var(--mono);
}

.error-msg { color: #e06060; font-size: 0.85rem; margin: 0; }
.success-msg { color: #60c080; font-size: 0.85rem; margin: 0; }

.btn-primary {
  align-self: flex-start;
  padding: var(--space-02) var(--space-05);
  background: var(--gold);
  color: #000;
  border: none;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
}

.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.videos-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
}

.video-row {
  display: flex;
  gap: var(--space-05);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-04);
  align-items: flex-start;
}

.video-thumb {
  width: 160px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  background: #111;
  flex-shrink: 0;
}

.video-info {
  flex: 1;
  min-width: 0;
}

.video-title {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-caption {
  font-size: 0.82rem;
  color: var(--gold);
  margin: 0 0 4px;
}

.video-desc {
  font-size: 0.82rem;
  color: var(--text-dim);
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
}

.empty {
  color: var(--muted);
  font-size: 0.9rem;
  font-family: var(--sans);
}

@media (max-width: 640px) {
  .fields-row { grid-template-columns: 1fr; }
  .video-row { flex-direction: column; }
  .video-thumb { width: 100%; height: 180px; }
}
</style>
