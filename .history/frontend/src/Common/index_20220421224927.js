const showToast = (message, type, theme) => {
  return toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    draggable: true,
    theme: theme,
    type: type,
  });
};
