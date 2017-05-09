import oss from 'ali-oss'
import co from 'co'

const store = oss({
  accessKeyId: 'LTAIzpBx3qKD0jTN',
  accessKeySecret: '2TTgIO8JfH2Bbb8gbKwsTrMLTTHP4X',
  bucket: 'zgamedaer',
  region: 'oss-cn-shanghai',
})

export default async function (file, filename) {
  let url
  await co(function* upload() {
    const buf = Buffer.from(file.split(',')[1], 'base64')
    const object = yield store.put(`gameAgent/${new Date().toISOString()}-${filename}`, buf)
    url = object.url
  })
  return url
}
