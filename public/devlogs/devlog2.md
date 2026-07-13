### **Image layer control**

`July 13th, 2026`

#### **Feature** 💡

I added the ability to control the **order of which images will be rendered** so you can put images in front of one another more easily (see the **operations buttons** on the right hand side).

!["operations"](/devlogs/devlog2-operations.png)

Previously the order of render would be based on the **order of which they were added to the layout** (later -> in front). As a result, you often have to delete an element and re-add it if you want to render it in front. This also meant that the base image (the pet) will always be at the back since it cannot be deleted and re-added. With proper layer control, you would no longer need these workarounds.

#### **Implementation** 💻

This was surprisingly easy to implement since images in **pawverwatch** are stored in an array and rendered sequentially. So to bring an image forward or backward I simply has to swap it with the image next to it. **ES6** has a feature called ***array destructuring*** that was designed for use-cases like this.

```ts
[images[i], images[i + 1]] = [images[i + 1], images[i]];
[images[i], images[i - 1]] = [images[i - 1], images[i]];
```
