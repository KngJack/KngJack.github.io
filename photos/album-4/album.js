/* 相册「album-1」的内容（改标题、日期、描述、照片清单，只改这个文件）
   ----------------------------------------------------------------
   · 图片放在同一个文件夹里（如 1.jpg、2.jpg…）；
   · photos 支持三种写法，任选一种：
       1) 数字：3                          → 用 1.jpg、2.jpg、3.jpg（没有图下说明）
       2) 文件名数组：['1.jpg', '2.png']   → 用你写的文件名
       3) 对象数组（可以写图下说明）：
            [{ file: '1.jpg', caption: '第一张的说明' },
             { file: '2.jpg', caption: '第二张的说明' }]
   · 封面自动取 photos 里的第一张，不用单独指定。 */
window.ALBUM_DATA = window.ALBUM_DATA || {};
window.ALBUM_DATA['album-4'] = {
  title: '相册一（占位标题）',
  date:  '2026-05-07',
  desc:  '这里是相册的一句话描述，先放着占位文字。',
  photos: [
    { file: '1.jpg', caption: '照片说明一（占位）' },
    { file: '2.jpg', caption: '照片说明二（占位）' }
  ]
};
