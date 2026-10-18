import { useId, useRef, useState } from 'react';
import { FilePlus2, FileText, Paperclip, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function FilePickerDemo() {
  const { t } = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  return <div className="control-demo"><div className="ct-file-frame">
    <label className="ct-control-label" htmlFor={id}><Paperclip size={16} aria-hidden="true" />{t('demo.additions.control.attachment')}</label>
    <div className="ct-file-picker">
      <input className="ct-file-input" ref={input} id={id} type="file" onChange={event => setFile(event.currentTarget.files?.[0] ?? null)} />
      <span aria-hidden="true"><FilePlus2 size={18} />{t(file ? 'demo.additions.control.changeFile' : 'demo.additions.control.chooseFile')}</span>
    </div>
    {file && <div className="ct-file-details">
      <FileText size={20} aria-hidden="true" />
      <div className="ct-file-info"><span>{file.name}</span><span>{t('demo.additions.control.fileSize', { size: file.size.toLocaleString('ko-KR') })}</span></div>
      <button type="button" className="ct-icon-button ct-file-remove" aria-label={t('demo.additions.control.removeAttachment', { name: file.name })} onClick={() => {
        if (input.current) { input.current.value = ''; input.current.focus(); }
        setFile(null);
      }}><X size={16} aria-hidden="true" /></button>
    </div>}
  </div></div>;
}
