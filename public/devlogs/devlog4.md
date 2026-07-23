### **Save to/Remove from favorites**

`July 23rd, 2026`

#### **Feature** 💡

You can now save an edit to favorites using the **Save** button at the exporting tool.

![export](/devlogs/devlog4-export.png)

You can access your favorites using the button on the right side of the navbar or by going to **<https://pawver.watch/favorites>**. Here you can download or remove favorited images.

#### **Implementation** 💻

This feature simply uses the **browser's local storage** rather than requiring users to create an account/log in so everything saved is **temporary** and can be deleted if the user clears their browser data.

Implementation was quite simple, I used `localStorage` for storing and retrieving images via `getItem()` and `setItem()` then it's just a matter of displaying the images in a neat and tidy manner.
