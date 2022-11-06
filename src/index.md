---
layout: 'layouts/home.njk'
title: 'Home'
meta:
  desc:
    '11st-Starter-Kit is a minimal starting point for building static websites
    with 11ty, powered by Vite with Tailwind CSS and Alpine.js.'
intro:
  title: "G'day, I'm Brody MacLean, a multi-disciplinary designer working remotely from Sydney, Australia."
  # desc: '<span class="mr-2">Currently, I am Design System Lead at</span><a href="https://www.prospa.com/" class="link" target="_blank" rel="noreferrer">{% svg "prospa", "h-4 w-20 inline-block fill-current text-emerald-500 hover:text-emerald-400" %}</a>, giving our designers and developers the tools to help small businesses keep moving.'
---

<p class="mb-8 text-lg text-neutral-400">
<span class="mr-2">Currently, I am Design System Lead at</span><a href='https://www.prospa.com/' class='link' target='_blank' rel='noreferrer'>{% svg "prospa", "-mx-0.5 h-4 w-20 inline-block fill-current text-emerald-500 hover:text-emerald-400" %}</a>, giving our designers and developers the tools to help small businesses keep moving.</p>

Previously I built design systems for [Deputy](https://www.deputy.com/){target="\_blank" rel="noreferrer" .decoration-orange-500 .decoration-2 .decoration-dotted} & [Jobadder](https://jobadder.com/){target="\_blank" rel="noreferrer" .decoration-blue-500 .decoration-2 .decoration-dotted}, as well as designed products for [SafetyCulture](https://safetyculture.com/){target="\_blank" rel="noreferrer" .decoration-purple-500 .decoration-2 .decoration-dotted}, [Hudl](https://www.hudl.com/){target="\_blank" rel="noreferrer" .decoration-orange-600 .decoration-2 .decoration-dotted} and [Fairfax Media](https://www.fairfaxmedia.com.au/){target="\_blank" rel="noreferrer" .decoration-blue-700 .decoration-2 .decoration-dotted}.
{.mb-8}

#### Get in touch {.mb-4 .text-xs .font-semibold .uppercase .text-neutral-450}

<div class="flex flex-wrap gap-2">
<a target="_blank" class="inline-flex items-center h-8 px-3 no-underline rounded-md text-sky-400 bg-neutral-800 hover:bg-neutral-750 hover:text-sky-300" href="https://twitter.com/BrodyMaclean">
{% icon "brand-twitter", "w-4 h-4 inline-block mr-2" %}Twitter</a>
<a target="_blank" class="inline-flex items-center h-8 px-3 text-pink-400 no-underline rounded-md bg-neutral-800 hover:bg-neutral-750 hover:text-pink-300" href="https://www.instagram.com/brody/">{% icon "brand-instagram", "w-4 h-4 inline-block mr-2" %}Instagram</a>
<a target="_blank" class="inline-flex items-center h-8 px-3 text-yellow-400 no-underline rounded-md bg-neutral-800 hover:bg-neutral-750 hover:text-yellow-300" href="mailto:hello@brody.com">{% icon "at", "w-4 h-4 inline-block mr-2" %}Email</a></div>

## Community

[Eleventy](https://www.11ty.dev/news/discord/) - [Vite](https://chat.vitejs.dev/) - [Tailwind CSS](https://tailwindcss.com/discord) - [Alpine.js](https://discord.gg/CGmj5nq)

## Awesome

[Eleventy](https://github.com/scottishstoater/awesome-eleventy) - [Vite](https://github.com/vitejs/awesome-vite) - [Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss) - [Alpine.js](https://github.com/alpine-collective/awesome)

## Ecosystem

[Eleventy](https://www.11ty.dev/) - [Vite](https://vitejs.dev/) -
[Tailwind CSS](https://tailwindcss.com/) - [Alpine.js](https://github.com/alpinejs/alpine/)

<!-- # h1 Heading -->

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Horizontal Rules

---

---

---

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,, -- ---

"Smartypants, double quotes" and 'single quotes'

## Emphasis

<!-- **This is bold text** -->

<!-- **This is bold text** -->

<!-- _This is italic text_ -->

<!-- _This is italic text_ -->

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

1. foo
2. bar

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
More text
```

Syntax highlighting

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ 'title text!')

Autoconverted link <https://github.com/nodeca/pica> (enable linkify to see)

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg 'The Stormtroopocat')

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'

## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O

### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++

### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

: Definition 1
with lazy continuation.

Term 2 with _inline markup_

: Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

\*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
_here be dragons_
:::
