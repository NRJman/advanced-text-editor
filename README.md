# AdvancedTextEditor

Unfortunately, in the last minutes I had some unexpected troubles with publishing this project to a GitHub, so I'm doing this only now. (the source code wasn't changed)

## What I would immediately improve

1) There are nooo any styles at all. First 30 minutes I had been struggling with inability to serve cloned and newly created Angular projects (Ubuntu related issues), so there was a decision to develop it from zero. Thankfully, I had a working draft that was created a day before, and used it as a launch pad.
2) The bug occured after my last quick changes to EditableTextareaService: when user continues typing in a textarea after pressing enter, the redundant spaces being added. (unfortunately noticed it after publishing :( )
3) Add words replacement feature.
4) Probably, it could make sense to work on a performance issue that occures when user selects a huge number of characters (try to handle an array of selected nodes using setTimeouts)

## How to run

Use [this link](https://NRJman.github.io/advanced-text-editor) to run the app.

## Running unit tests

I have written few dummy test cases in editor.component.spec.ts for demostrating purposes. Run `ng test` to execute this unit test.
