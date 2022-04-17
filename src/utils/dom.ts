export function hideInitialLoading (){
  const loadingDom = document.getElementById('M_initial_loading');
  if (loadingDom) {
    loadingDom.parentNode?.removeChild(loadingDom);
  }
};