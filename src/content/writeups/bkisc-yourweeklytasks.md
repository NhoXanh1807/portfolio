---
title: "BKISC Recruit 2025 - Your Weekly Tasks Writeup (OSINT)"
summary: "Deep-dive OSINT walkthrough for the BKISC Recruit 2025 weekly tasks challenge, from social media breadcrumbs to stego puzzles."
pubDate: "Nov 11 2024"
heroImage: "/images/writeups/bkisc-yourweeklytasks/bkiscrecruit.png"
tags: ["OSINT", "CTF", "Steganography", "Social Engineering"]
tools: ["exiftool", "steghide", "binwalk", "Wayback Machine"]
---

## Motivation

Hello everyone, thank you for taking the time to solve this challenge of mine.  
I’d also like to thank **vjz3r** ([https://vjz3r.github.io/](https://vjz3r.github.io/)) for the _ID post bio_ idea from **ISDTU 2024**, and brother **BaoDoktah** from **BKISC Recruit 2024** - their ideas helped me cook up this **CTF OSINT challenge**.  
Alright, let’s get started!

## Starting Point

This challenge begins from **my personal X (Twitter) page**.  
I used my **personal account** instead of creating a clone (honestly, I was just lazy 😅).  
\_Sorry, no screenshots — I deleted all the posts at the time of writing :()

The **first post** gives you the **last part of the flag**:

```
_The_B3g1nn1ng!!!}
```

Hehe, just something to keep you motivated 😆  
It also includes a **YouTube link** → _+1 Rick Roll 🎵_

## Part 1

Then, there’s a post asking about **your weekly activities after joining BKISC**, and a hint to **find me across all platforms**.  
Combining these clues — if you bought _Hint 1_, which says _“a place where CTF players around the world often visit”_, then you’ll definitely find **CTFtime[.]org**.

From there, look for me!  
Go to the Vietnam ranking and you’ll see **BKISC ranked #1** — yeah 🎉  
_(Insert BKISC image here — I’ll add the relative link later)_
![BKISC on CTF](/images/writeups/bkisc-yourweeklytasks/CTFTimeBKISC.png)
Scroll down and find **Te0f** — click the **profile**, and you’ll see I joined a few CTF teams.

![Te0f on CTF](/images/writeups/bkisc-yourweeklytasks/CTFTimeTe0f.png)

You’ll notice a **suspiciously encoded name**, probably **encoded with ROT13**.

![Decode Part 1 on CTF](/images/writeups/bkisc-yourweeklytasks/DecodePart1.png)

Decoding it gives **Part 1 of the challenge**:

```
BKISC{Rick_R0ll_s0_fun_but_W3_kn0w_y0u_Never_G1v3s_Y0u_Up
```

Click on that team, and you’ll find **another link**.  
![Rick Roll Link on CTF Time](/images/writeups/bkisc-yourweeklytasks/CTFTimeTeam.png)

→ _+1 more Rick Roll 😎_

This part of flag only introduce the CTF platform, may be you can use in the near future if you passionate about Cyber Security

## Part 2

We still have one more clue we haven't used: the **Drive link** in the X bio. After downloading the image and running `exiftool`, you get the following output:

```
te0f@Quang:~$ exiftool steg_me.jpg
ExifTool Version Number         : 12.76
File Name                       : steg_me.jpg
Directory                       : .
File Size                       : 11 kB
File Modification Date/Time     : 2025:11:11 12:41:49+00:00
File Access Date/Time           : 2025:11:11 12:42:15+00:00
File Inode Change Date/Time     : 2025:11:11 12:42:15+00:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
X Resolution                    : 72
Y Resolution                    : 72
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
Copyright                       : aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUSZsaXN0PVJEZFF3NHc5V2dYY1Emc3RhcnRfcmFkaW89MQ==
XMP Toolkit                     : Image::ExifTool 12.76
Author                          : WangTe0f_from_BKISC
Image Width                     : 225
Image Height                    : 225
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 225x225
Megapixels                      : 0.051
```

Notice the `Copyright` field — it contains a **Base64 string**. Decoding that Base64 yields a YouTube watch link (and, predictably, +1 Rick Roll).

If you run `binwalk` on the image, it extracts a file named `flag_part_1.txt`. (The author admits there was a configuration error when converting PNG → JPG so the plaintext got scrambled; normally it should've pointed to a Rick Roll link — but ignore that anomaly.)

Trying `steghide` is the next step; it **requires a password**. The password is in the `Author` field from the `exiftool` output: `WangTe0f_from_BKISC`. That’s OSINT, so guesswork is allowed here.

Command used:

```
te0f@Quang:~$ steghide --extract -sf steg_me.jpg -p WangTe0f_from_BKISC
wrote extracted data to "secret_steg.txt".

te0f@Quang:~$ cat secret_steg.txt
https://github.com/NhoXanh1807
```

The extracted `secret_steg.txt` contains a GitHub link but you alsso can find my GitHub by searching `Te0f` on GitHub.

![Te0f Github](/images/writeups/bkisc-yourweeklytasks/Te0fGithub.png)

On my GitHub there's a repo named `MyInfo` (I didn't lock other repos — if you got this far, I suppose you had to search a bit). There's a small app in the repo (I asked Claude to code it), but nothing important inside. However, you can check commit history or other branches because Claude worked on it with me.

Inside the repo you will find a suspicious YouTube link:

```
https://www.youtube.com/watch?v=pZ5JYTdVZmk
```

If you open the YouTube video and spot a **QR code** in the thumbnail, that's a hint for Part 2. Extract the thumbnail (e.g., with y2mate or any thumbnail downloader) and read the QR code.

![y2mate ricrool qr](/images/writeups/bkisc-yourweeklytasks/y2mate.png)
→ yes, another Rick Roll moment hidden in the media.

Don't give up — after watching the video you should notice the content references going back in time. Use the **Wayback Machine** to retrieve the website (archived snapshot). The page was archived on **2025-10-23** and the video description in that snapshot contains **Part 2 of the flag** under the description field.

![archive ytb](/images/writeups/bkisc-yourweeklytasks/archive.png)
Part 2 is:

```
thi5_1s_Th3_Ult1mat3_H4rd_Ch4ll3ng3
```

## Part 3

I'm tired from typing, so I'll speed through Part 3.

You probably found the Facebook clone of my profile (easy like cyou find your crush's Facebook ): **Tèo Tập Đánh Vần** (https://www.facebook.com/teo.tap.anh.van).

![Te0f facebook](/images/writeups/bkisc-yourweeklytasks/page.png)

As I previously hinted, you don't need to look far — the clue is right on the public profile. The bio contains the line:

```
"Y0u 4r3 0n th3 right w4y
2 steps more :)"
```

It looks like a simple hint confirming you're on the right track, but there's a trick: copy a portion like `"Y0u 4r3 0n th3 right w4y"`, then view the page source (Ctrl+U) and Ctrl+F to search for that string. You'll find the **post ID**: `122214536540111689`.
![Find post](/images/writeups/bkisc-yourweeklytasks/find.png)
Open the post URL:

```
https://www.facebook.com/teo.tap.anh.van/posts/122214536540111689
```

![Te0f facebook post](/images/writeups/bkisc-yourweeklytasks/post.png)

In the post comments there's a **Pastebin** link click it:

```
https://pastebin.com/zzWCNrJX
```

![Pastebin](/images/writeups/bkisc-yourweeklytasks/pastebin.png)

The Pastebin contains mostly blank lines and the word `hehe`. Don't be afraid, copy the content and paste it into the Whitespace interpreter at:

```
http://dcode.fr/whitespace-language
```

![whitespace](/images/writeups/bkisc-yourweeklytasks/whitespace.png)
Decode it and you get **Part 3** of the flag.

Part 3 is:

```
s0_th4nk_f0r_s0lv3_909090123_Th3_End_1s_JuSt
```

### Final flag & submission

Combine the parts and submit the final flag:

```
BKISC{Rick_R0ll_s0_fun_but_W3_kn0w_y0u_Never_G1v3s_Y0u_Up_thi5_1s_Th3_Ult1mat3_H4rd_Ch4ll3ng3_s0_th4nk_f0r_s0lv3_909090123_Th3_End_1s_JuSt_The_B3g1nn1ng!!!}
```

**Congratulations — challenge complete!**
