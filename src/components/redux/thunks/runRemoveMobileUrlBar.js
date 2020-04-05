function runRemoveMobileUrlBar() {
    return (dispatch, getState) => {
        setTimeout(function(){
            // This hides the address bar:
            window.scrollTo(0, 1);
        }, 0);
    }
}
export default runRemoveMobileUrlBar;