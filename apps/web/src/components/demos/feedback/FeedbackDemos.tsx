import { useId, useState } from 'react';
import { Bell, Star } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function StarRatingDemo() {
  const { t } = useLocale();
  const [rating, setRating] = useState(0);
  const groupName = useId();
  return <div className="feedback-demo fd-rating-demo">
    <fieldset className="fd-rating"><legend className="sr-only">{t('demo.additions.feedback.chooseRating')}</legend>{[1, 2, 3, 4, 5].map(value => <label className="fd-rating-option" key={value}>
      <input type="radio" className="sr-only fd-rating-input" name={groupName} value={value} aria-label={t('demo.additions.feedback.ratingScore', { score: value })} checked={rating === value} onChange={() => setRating(value)} />
      <span className="fd-rating-star"><Star size={26} fill={value <= rating ? 'currentColor' : 'none'} aria-hidden="true" /></span>
    </label>)}</fieldset>
  </div>;
}

export function NotificationBadgeDemo() {
  const { t } = useLocale();
  const [read, setRead] = useState(false);
  return <div className="feedback-demo fd-badge-demo">
    <button type="button" className="fd-notification-button" data-read={read} aria-label={read ? t('demo.additions.feedback.restoreNotifications') : t('demo.additions.feedback.markNotificationsRead', { count: 3 })} onClick={() => setRead(value => !value)}>
      <Bell size={26} aria-hidden="true" />{!read && <span className="fd-notification-badge" aria-hidden="true">{3}</span>}
    </button>
  </div>;
}
