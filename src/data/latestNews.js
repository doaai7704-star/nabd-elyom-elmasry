const now = new Date().toISOString()
export const latest = [
  {
    _id: 'n1',
    title: 'إطلاق مشروع تنمية جديدة في سيناء',
    summary: 'مشروع ضخم يهدف إلى تطوير البنية التحتية.',
    imageUrl: 'https://picsum.photos/1200/700?random=201',
    publishedAt: now,
    category: 'أخبار مصر'
  },
  {
    _id: 'n2',
    title: 'سعر الدولار يسجل تغيرات اليوم',
    summary: 'البنوك تعلن تحديثات طفيفة في سعر الصرف.',
    imageUrl: 'https://picsum.photos/1200/700?random=202',
    publishedAt: now,
    category: 'اقتصاد'
  },
  {
    _id: 'n3',
    title: 'تفاصيل مباراة الليلة القوية',
    summary: 'الأهلي يواجه خصماً قوياً في لقاء حاسم.',
    imageUrl: 'https://picsum.photos/1200/700?random=203',
    publishedAt: now,
    category: 'رياضة'
  },
  {
    _id: 'n4',
    title: 'معرض فني يعرض إبداعات محلية',
    summary: 'معرض فني يحفز المواهب الشابة.',
    imageUrl: 'https://picsum.photos/1200/700?random=204',
    publishedAt: now,
    category: 'فن وثقافة'
  }
]
export default latest
