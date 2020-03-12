const copyToClipboard = (content) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(content);
  } else {
    // lets do it, on the old way
    return new Promise((resolve, reject) => {
      let copyAreaId = 'copy-area';
      let textarea = document.getElementById(copyAreaId);
      if (!textarea) {
        textarea = document.createElement('textarea');
        textarea.id = copyAreaId
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
      }
      textarea.value = content;

      try {
        textarea.select();
        document.execCommand('copy');
        resolve();
      } catch(e) {
        reject(e);
      }
    });
  }
};



export default copyToClipboard;