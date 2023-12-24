function WindowWH(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    if(w>h){
    h = w;
    }
    $('#p5-container').height(h);
    $('#layer-top').width(w);
    $('#layer-top').height(h);
    $('#content-top').height(h);
}
$(window).resize(function() {
    WindowWH();
});
$(window).ready(function() {
    WindowWH();
});