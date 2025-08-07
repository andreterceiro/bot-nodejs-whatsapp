Here we have a simple WhatsApp bot with an admin area.

[Video demonstration](https://youtu.be/6KgZlTJfgRo).

[LinkedIN publication](https://www.linkedin.com/posts/andr%C3%A9-terceiro_bot-para-o-whatsapp-com-admin-activity-7101311153481392128-mUjI?utm_source=share&utm_medium=member_desktop).

I will be very happy with a job offer, ok?

Why I used whatsapp-web.js from a Git repository instead the official library (see `package.json`). Because when I used the official library the event `ready` was not fired. I don't know why...


# Important consideration

Systems based on WhatsApp web and Puppeteer are considered as "bad guys" by Meta, I don't know exactly why, maybe they want to control the API becuase of the monetization. But I do not know why. Bots like this works, but you have to carefully consider this information. **I do not know exactly**, but this can lead to banning of the number that sends messages through this bot. Please see the documents provided by WhatsApp in relation to the rules of bots and integrations.
