import { useState } from 'react';
import { Save } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

interface SaveSlot {
  id: number;
  titleKey: 'demo.game.save.slot1Title' | 'demo.game.save.slot2Title' | 'demo.game.save.slot3Title' | 'demo.game.save.slot3OccupiedTitle';
  chapterKey: 'demo.game.save.chapterA' | 'demo.game.save.chapterB' | 'demo.game.save.chapterNew' | null;
  timeKey: 'sample.game.save.slot1Time' | 'sample.game.save.slot2Time' | 'sample.game.save.slotNowTime' | null;
}

const INITIAL_SLOTS: SaveSlot[] = [
  { id: 1, titleKey: 'demo.game.save.slot1Title', chapterKey: 'demo.game.save.chapterA', timeKey: 'sample.game.save.slot1Time' },
  { id: 2, titleKey: 'demo.game.save.slot2Title', chapterKey: 'demo.game.save.chapterB', timeKey: 'sample.game.save.slot2Time' },
  { id: 3, titleKey: 'demo.game.save.slot3Title', chapterKey: null, timeKey: null },
];

export function GameSaveSlotManagerDemo() {
  const { t } = useLocale();
  const [slots, setSlots] = useState<SaveSlot[]>(INITIAL_SLOTS);
  const [confirmSlotId, setConfirmSlotId] = useState<number | null>(null);
  const [statusNotice, setStatusNotice] = useState<{
    key: 'demo.game.save.statusSaved' | 'demo.game.save.statusLoaded' | 'demo.game.save.statusPrompt';
    slotKey: SaveSlot['titleKey'];
  } | null>(null);

  const commitSave = (slot: SaveSlot) => {
    const nextTitleKey = slot.id === 3 ? 'demo.game.save.slot3OccupiedTitle' : slot.titleKey;
    setSlots((prev) =>
      prev.map((item) =>
        item.id === slot.id
          ? {
              ...item,
              titleKey: nextTitleKey,
              chapterKey: 'demo.game.save.chapterNew',
              timeKey: 'sample.game.save.slotNowTime',
            }
          : item
      )
    );
    setConfirmSlotId(null);
    setStatusNotice({ key: 'demo.game.save.statusSaved', slotKey: nextTitleKey });
  };

  const handleSaveClick = (slot: SaveSlot) => {
    if (slot.chapterKey !== null) {
      setConfirmSlotId(slot.id);
      setStatusNotice({ key: 'demo.game.save.statusPrompt', slotKey: slot.titleKey });
      return;
    }
    commitSave(slot);
  };

  const handleLoadClick = (slot: SaveSlot) => {
    if (slot.chapterKey === null) return;
    setConfirmSlotId(null);
    setStatusNotice({ key: 'demo.game.save.statusLoaded', slotKey: slot.titleKey });
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
            <Save aria-hidden="true" className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('demo.game.save.title')}</span>
          </div>
          {statusNotice && (
            <span role="status" aria-live="polite" className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 truncate">
              {t(statusNotice.key, { slot: t(statusNotice.slotKey) })}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {slots.map((slot) => {
            const isEmpty = slot.chapterKey === null;
            const isConfirming = confirmSlotId === slot.id;
            return (
              <div
                key={slot.id}
                className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 px-2.5 py-2 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[11px] text-slate-800 dark:text-slate-100 truncate">
                    {t(slot.titleKey)}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {slot.chapterKey && slot.timeKey
                      ? `${t(slot.chapterKey)} · ${t(slot.timeKey)}`
                      : t('demo.game.save.emptyLabel')}
                  </p>
                </div>

                {isConfirming ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => commitSave(slot)}
                      className="min-h-6 px-2 py-0.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] transition-colors cursor-pointer"
                    >
                      {t('demo.game.save.confirmOverwrite')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmSlotId(null)}
                      className="min-h-6 px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {t('demo.game.save.cancelOverwrite')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSaveClick(slot)}
                      className="min-h-6 px-2 py-0.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      {t('demo.game.save.saveBtn')}
                    </button>
                    <button
                      type="button"
                      disabled={isEmpty}
                      onClick={() => handleLoadClick(slot)}
                      className="min-h-6 px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[10px] hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      {t('demo.game.save.loadBtn')}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
