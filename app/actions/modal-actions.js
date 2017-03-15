export const openModal = (
  { title, content, acceptButtonLabel, canCancel, cancelButtonLabel, canDismiss, cb },
) => ({
  type: 'OPEN_MODAL',
  title,
  content,
  acceptButtonLabel,
  canCancel,
  cancelButtonLabel,
  canDismiss,
  cb,
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
