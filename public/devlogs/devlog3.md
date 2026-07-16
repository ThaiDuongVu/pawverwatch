### **Map background**

`July 15th, 2026`

#### **Feature** 💡

You can now set an Overwatch map as the background for your edit.

![winton](/devlogs/devlog3-winton.png)

The maps are organized by **game modes** (5 core modes + Clash and 2CP). To set a background, simply click on a mode, a dialog will appear with maps of that mode, click on the map you want and you're done!

You can also unset it should you change your mind.

#### **Implementation** 💻

This was relatively simple to implement since I already have code for adding different pieces of a hero so I just did some copy-pasting for the map modal.

The background itself lies in a **separate layer** from the rest of the images, this will make sure that the map will stay at the back of the layout and everything else goes on top of it. I also set the background to be **immutable**, meaning it cannot be selected, moved, rotated, scaled, etc.
