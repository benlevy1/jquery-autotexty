jquery-autotexty
================

This jQuery plugin attaches to text inputs and allows user to choose contents for the input from words and phrases you provide

Autotexty attaches to text inputs and allows the user to choose text for the
input from the text you provide.

Send autotexty a collection of words or phrases and when the user focuses on
the input that collection will be rendered and each word or phrase will be
clickable. The words are rendered as links with the class 'autotexty_item'
inside a <div> with the class 'autotexty'

When the user clicks on one of the words or phrases it will be added to the
attached input.

Here's an example:
$('#text_input').autotexty({data: ['my','list','of','words']})

The available settings are as follows:

data: an array of words or phrases for autotexty
separator: the character(s) to add between words when they are added to the input
width: the width for the autotexty <div>
maxHeight: the maximum height for the autotexty <div> before it becomes scrollable
track: move the autotexty <div> to the input in case the input moves
background: set the background of the autotexty <div>