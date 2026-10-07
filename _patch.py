s=open("_build.py",encoding="utf-8").read()
s=s.replace("import json,os","import json,os,subprocess\nfrom content import DETAIL",1)
old_start=s.index('<section style="padding-top:20px"><h2>Highlights</h2>')
old_end=s.index('<section><h2>More from Babar</h2>')
s=s[:old_start]+"MEDIA_PLACEHOLDER\n"+s[old_end:]
s=s.replace('''    "".join("<div><b>%s</b><span>%s</span></div>"%x for x in f),others)
    h+=foot("../")''','''    others)
    D=DETAIL[k]
    media=""
    if D["video"]:
        tall=""
        try:
            o=subprocess.check_output(["ffprobe","-v","error","-select_streams","v","-show_entries","stream=width,height","-of","csv=p=0","media/%s/promo.mp4"%k]).decode().strip().split(",")
            tall=" tall" if int(o[1])>int(o[0]) else ""
        except Exception: pass
        media+='<section style="padding-top:20px"><h2>Watch</h2><div class="vid r%s"><video controls preload="metadata" playsinline poster="../media/%s/poster.jpg"><source src="../media/%s/promo.mp4" type="video/mp4"></video></div></section>'%(tall,k,k)
    media+='<section style="padding-top:20px"><h2>Screenshots</h2><div class="gal r">%s</div></section>'%"".join('<button type="button" data-full="../media/%s/shot%d.jpg"><img src="../media/%s/shot%d.jpg" alt="%s screenshot %d" loading="lazy"></button>'%(k,i,k,i,n,i) for i in range(1,D["shots"]+1))
    media+='<section><h2>About this %s</h2><div class="prose r">%s</div></section><section><h2>How to play</h2><ol class="steps r">%s</ol></section><section><h2>Key features</h2><div class="feat r">%s</div></section>'%("game" if c in GAMEAPP else "app","".join("<p>%s</p>"%x for x in D["about"]),"".join("<li>%s</li>"%x for x in D["how"]),"".join("<div><b>%s</b><span>%s</span></div>"%x for x in D["feats"]))
    h=h.replace("MEDIA_PLACEHOLDER",media)
    h=h.replace('</footer>','</footer><div class="lb" id="lb"><img alt=""></div><script src="../assets/detail.js"></script>',1) if False else h
    h+=foot("../")
    h=h.replace('<script src="../assets/app.js"></script>','<div class="lb" id="lb"><img alt=""></div><script src="../assets/app.js"></script><script src="../assets/detail.js"></script>')''')
s=s.replace('<link rel="stylesheet" href="%sassets/style.css">','<link rel="stylesheet" href="%sassets/style.css"><link rel="stylesheet" href="%sassets/detail.css">')
s=s.replace("%(title,desc,canon,pre,pre,pre,pre,title,desc","%(title,desc,canon,pre,pre,pre,pre,title,desc") 
open("_build.py","w",encoding="utf-8").write(s)
