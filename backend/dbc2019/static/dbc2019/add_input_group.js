
var btn = $('#btn');
var head = '<div id="input-group" class="input-group">';
var tail = '</div>';

btn.click(function () {
    var input_group = $('#input-group');
    var new_input_group = head + input_group.html() + tail;
    input_group.removeAttr('id');
    input_group.after(new_input_group);
});
