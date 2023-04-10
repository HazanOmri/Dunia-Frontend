export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  const CLOUD_NAME = 'dbd9fozyt'
  const UPLOAD_PRESET = "dunia_imgs"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    return res.json().then(body => {
      return body.url
    })
  } catch (err) {
    return err
  }
}
