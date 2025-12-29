# How to Update Website Content

This guide shows you how to easily update projects, team members, and testimonials **without coding**.

## 📁 Files to Edit

All content is stored in the `/src/data` folder:

```
/src/data
├── projects.json       ← Update projects here
├── team.json          ← Update team members here
└── testimonials.json  ← Update testimonials here
```

---

## 🎨 Adding a New Project

1. Open `src/data/projects.json`
2. Copy this template:

```json
{
  "id": "my-project-name",
  "title": "My Project Name",
  "category": "Commercial",
  "year": "2024",
  "location": "City Name",
  "client": "Client Name",
  "image": "/images/my-project.jpg",
  "description": "Full description of the project.",
  "shortDescription": "Brief one-liner",
  "challenge": "What was the challenge?",
  "solution": "How did you solve it?",
  "results": [
    "Result 1",
    "Result 2",
    "Result 3"
  ],
  "images": [
    "/images/my-project.jpg",
    "/images/my-project-2.jpg"
  ]
}
```

3. Paste it into the `projects` array
4. Fill in your information
5. Add a comma after the previous project
6. Save the file!

**Important**:
- `id` must be lowercase with dashes (used in URL)
- Upload images to `/public/images/` first
- Image paths start with `/images/`

---

## 👥 Adding a Team Member

1. Open `src/data/team.json`
2. Copy this template:

```json
{
  "id": 5,
  "name": "Your Name",
  "role": "Your Role",
  "image": "/images/team/your-photo.jpg",
  "bio": "Short bio",
  "email": "your@buildpro.com",
  "linkedin": "https://linkedin.com/in/yourname"
}
```

3. Paste into the `team` array
4. Increment the `id` number
5. Upload photo to `/public/images/team/`
6. Save!

---

## 💬 Adding a Testimonial

1. Open `src/data/testimonials.json`
2. Copy this template:

```json
{
  "id": 4,
  "quote": "The client's testimonial quote goes here.",
  "author": "Client Name",
  "position": "CEO, Company Name",
  "rating": 5,
  "project": "Project Name"
}
```

3. Paste into `testimonials` array
4. Increment `id`
5. Save!

---

## ⚠️ Common Mistakes

**DON'T FORGET COMMAS!**
```json
{
  "id": 1,
  "name": "Project 1"
},  ← Need comma here!
{
  "id": 2,
  "name": "Project 2"
}  ← No comma on last item
```

**Use Double Quotes**
✅ Correct: `"title": "My Project"`  
❌ Wrong: `'title': 'My Project'`

**Check Your Brackets**
- Every `{` needs a `}`
- Every `[` needs a `]`

---

## 🚀 After Editing

1. Save the file
2. Refresh your website
3. Changes appear instantly!

---

## 🆘 Need Help?

If you see an error:
1. Check for missing commas
2. Check for missing quotes
3. Use a JSON validator: https://jsonlint.com/

Or ask a developer to help!
