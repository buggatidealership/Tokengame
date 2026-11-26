cd /home/user/Tokengame/ez/tools/concepts/pumpfun/burn
B='Same gouache Saturday-morning cartoon painting style, palette and brushwork as the reference image (orange and purple sunset canyon, rocky ledge). Square composition, the subject large and centred on the rock ledge, the canyon behind. No text, no letters, no numbers, no logos anywhere.'
g(){ python3 hd.py gen "$1" gpt-image-2 "$(python3 -c "import json,sys;print(json.dumps({'prompt':sys.argv[1],'aspect_ratio':'1:1','resolution':'1K','quality':'medium','output_format':'png','num_outputs':1}))" "$2 $B")" ref-cliff.jpg > log-$1.txt 2>&1; }
g bag "A huge bulging burlap money sack, tied with rope, overflowing with shiny gold coins, sitting proudly on the rock ledge, a few coins spilled around it." &
g fire "The same huge burlap money sack full of gold coins is engulfed in big bright cartoon flames on the rock ledge, coins glowing orange, sparks and curling smoke rising into the sunset sky." &
g pouch "On the rock ledge, a small pile of grey ash and a few charred coins where a big sack burned, and beside it one small leather coin pouch tied with string, a single wisp of smoke, calm and a little smug." &
wait; echo ALLDONE
