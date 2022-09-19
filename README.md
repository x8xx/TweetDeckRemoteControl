# TweetDeck Remote Control

## Run TRC Server
```
deno run --allow-net server/server.ts
```

## Vim Plugin
install denops
```
vim-denops/denops.vim
```

vimrc
```
nnoremap <Leader>t :Trc<CR>
function! Trc() abort
    echo "Start TRC mode:"
    while 1
        let c = getcharstr()
        if c == 'q'
            redraw
            echo "Exit TRC mode"
            break
        elseif c == 'p'
            echo denops#request('trc', 'checkTweetDeckConnection', '[]')
        elseif c == 'r'
            echo denops#request('trc', 'reconnect', '[]')
        elseif c == 'h'
            call denops#request('trc', 'lscroll', '[]')
        elseif c == 'l'
            call denops#request('trc', 'rscroll', '[]')
        endif
    endwhile
endfunction
command! Trc call Trc()
```
