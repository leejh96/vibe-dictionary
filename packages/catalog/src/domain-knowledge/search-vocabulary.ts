export const KNOWLEDGE_SYNONYMS: readonly (readonly string[])[] = [
  ['education', '교육', '교육서비스', '교육 서비스', '교육 플랫폼', '교육플랫폼', 'lms', 'learning management system', '학습 관리 시스템', '학습관리시스템', '이러닝', 'e-learning', 'elearning'],
  ['course', 'courses', 'lesson', 'lessons', '강의', '수업', '강좌', '레슨', '온라인 강의', '온라인강의', 'online course', 'online courses'],
  ['learning', '학습'], ['quiz', 'quizzes', '퀴즈'],
  ['assignment', 'assignments', 'homework', '과제'],
  ['submission', 'submissions', 'submit', '제출'],
  ['resubmission', 'resubmit', '재제출', '다시 제출'],
  ['latework', 'late submission', 'late work', '지각 제출', '지각제출', '기한 후 제출'],
  ['retry', 'retries', '재시도', '다시 풀기'],
  ['feedback', '피드백'], ['assessment', '평가'], ['progress', '진도', '진행률'],
  ['completion', '완료', '수료'], ['deadline', 'deadlines', '마감'], ['draft', 'drafts', '초안'],
  ['ratio', '비율', 'percentage', 'percent'],
  ['community', 'communities', 'forum', 'forums', '커뮤니티', '게시판', '포럼'],
  ['post', 'posts', '게시물', '게시글'], ['comment', 'comments', '댓글'],
  ['visibility', '공개 범위', '공개범위'],
  ['permission', 'permissions', '권한', '접근 권한', '접근권한', 'access control', '접근 제어', '접근제어'],
  ['memberonly', 'members only', 'members-only', 'member only', '회원 전용', '회원전용', '회원만', 'private group', '비공개 그룹', '그룹 전용'],
  ['report', 'reports', '신고'],
  ['moderation', '운영', '모더레이션', '신고 처리', '신고처리', '신고 검토'],
  ['hide', 'hidden', 'hiding', '숨김', '숨기기'],
  ['restore', 'restoration', '복구', '복원'], ['lock', 'locking', 'locked', '잠금'],
];

export const KNOWLEDGE_STOP_WORDS = [
  '서비스', '사이트', '플랫폼', '만들고', '만들려고', '만들려는', '싶어', '싶어요', '싶다', '싶은데',
  '알려줘', '알고', '대한', '관련', '필요한', '지식', '어떻게', '할', '수', '있는', '볼',
  'service', 'website', 'platform', 'build', 'building', 'would', 'like', 'need', 'about', 'how',
] as const;
