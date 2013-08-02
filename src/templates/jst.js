window.JST = {};

window.JST['preset'] = _.template(
    '<div class="view"><%- title %> : <%- bpm %> bpm<button class="destroy icon-trash"></button></div>'
);


window.JST['metronome'] = _.template(
    '<div class="wrapper <%- status %>"><div id="on-off-div"><button class="start">On</button><button class="stop">Off</button></div><div id="slider"></div><div class="row"><div id="bpm-div" class="span2"><label for="amount">Beats per Minute:</label><input type="text" id="bpm" readonly="readonly" /></div><div class="preset-form span4"><input name="title" id="title"></button><button id="new-preset" name="title">New Preset</button><div class="prompt"></div></div></div></div>'
);
