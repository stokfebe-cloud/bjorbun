# 🤝 Contributing Guide

Terima kasih sudah tertarik berkontribusi ke nasipadangMAX! 🎉

Panduan ini akan membantu Anda memahami workflow, standards, dan best practices kami.

---

## 📋 Code of Conduct

Kami berkomitmen menciptakan lingkungan yang welcoming dan inclusive.

### Kami menghargai:
✅ Respectful communication
✅ Constructive feedback
✅ Inclusivity
✅ Collaboration

### Kami tidak toleransi:
❌ Harassment atau discrimination
❌ Disrespectful language
❌ Personal attacks
❌ Spam atau trolling

---

## 🚀 Getting Started

### 1. Fork Repository
```bash
# Go to https://github.com/stokfebe-cloud/bjorbun
# Click "Fork" button
# Clone your fork
git clone https://github.com/YOUR-USERNAME/bjorbun.git
cd bjorbun
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/your-bug-fix
# atau
git checkout -b docs/your-doc-update
```

### 3. Make Changes
```bash
# Edit files
# Test locally
# Make sure it works
```

### 4. Commit & Push
```bash
git add .
git commit -m "Add your descriptive commit message"
git push origin feature/your-feature-name
```

### 5. Open Pull Request
```
- Go to GitHub
- Click "New Pull Request"
- Select your branch
- Write description
- Submit! 🎉
```

---

## 🎯 Contribution Types

### 🐛 Bug Fixes
```
Branch naming: fix/bug-description
Example: fix/emotion-detection-crash

Description should include:
- What was broken
- How you fixed it
- Steps to reproduce bug
- Testing done
```

### ✨ Features
```
Branch naming: feature/feature-name
Example: feature/leaderboard-system

Description should include:
- What the feature does
- Why it's useful
- How it works
- Example usage
- Testing done
```

### 📚 Documentation
```
Branch naming: docs/doc-name
Example: docs/api-examples

Just update markdown files:
- README.md
- API_REFERENCE.md
- INSTALLATION.md
- etc.
```

### 🎨 UI/UX Improvements
```
Branch naming: ui/improvement-name
Example: ui/dark-mode-support

Description should include:
- Before/after screenshots
- Design rationale
- Browser compatibility
- Performance impact
```

### ♻️ Refactoring
```
Branch naming: refactor/area-name
Example: refactor/emotion-detection-logic

Description should include:
- What was refactored
- Why (performance, maintainability, etc)
- Breaking changes (if any)
- Backward compatibility
```

---

## 💻 Development Setup

### Local Development
```bash
# Clone repository
git clone https://github.com/stokfebe-cloud/bjorbun.git
cd bjorbun

# Start local server
python -m http.server 8000
# atau
npx http-server

# Open http://localhost:8000
```

### Testing Locally
```bash
# Open browser DevTools (F12)
# Check Console tab for errors
# Test all features:
# - Camera access
# - Emotion detection
# - Template generation
# - Download functionality
# - WhatsApp sharing
```

### Browser Testing
```
Minimum browsers to test:
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile Chrome (Android)
✅ Mobile Safari (iOS)
```

---

## 📝 Code Standards

### JavaScript Style Guide
```javascript
// Use const by default, let if needed, avoid var
const API_URL = 'https://...';

// Use meaningful variable names
const emotionDetectionResult = {};  // ✅ Good
const edr = {};                     // ❌ Bad

// Use arrow functions for callbacks
const handleScan = () => { ... };

// Add comments for complex logic
// Calculate dominant emotion from history (30-frame buffer)
const dominant = this.calculateDominantEmotion();

// Use try-catch for async operations
try {
  await aiEngine.loadModels();
} catch (error) {
  console.error('Model loading failed:', error);
}

// Use template literals
const message = `Mood: ${emotion}, Confidence: ${confidence}`;

// Indent with 2 spaces
if (condition) {
  // 2 space indent
  const result = doSomething();
}
```

### HTML Standards
```html
<!-- Use semantic HTML5 -->
<section class="panel">
  <h1>Title</h1>
  <p>Description</p>
</section>

<!-- Use aria attributes for accessibility -->
<button aria-label="Start scanning">Mulai Scan</button>

<!-- Use data attributes for JS data -->
<div data-emotion="happy" data-confidence="0.95">...</div>

<!-- Format with proper indentation -->
<div class="container">
  <div class="item">
    <h2>Item Title</h2>
  </div>
</div>
```

### CSS Standards
```css
/* Use meaningful class names (BEM methodology) */
.btn--primary { }          /* ✅ Good */
.btn1 { }                  /* ❌ Bad */

/* Use CSS variables for colors, fonts */
:root {
  --primary-color: #d85050;
  --text-color: #fff7f1;
}

/* Mobile-first responsive design */
.container {
  width: 100%;
  padding: 12px;
}

@media (min-width: 640px) {
  .container {
    width: 50%;
  }
}

/* Use shorthand when possible */
margin: 10px 20px;  /* ✅ Good */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;
```

### Documentation Standards
```markdown
# Use H1 for main title

## Use H2 for sections

### Use H3 for subsections

- Use markdown lists
- Format code with backticks

\`\`\`javascript
// Code blocks with language specified
const result = await aiEngine.detectEmotion(video);
\`\`\`

Use **bold** for emphasis
Use _italic_ for slight emphasis
Use `code` for inline code
```

---

## 🧪 Testing & QA

### Before Submitting PR:

#### Functional Testing
```
[ ] Scan works correctly
[ ] Emotion detection accurate
[ ] Template generation works
[ ] Download saves file
[ ] WhatsApp sharing works
[ ] Sound effects play
[ ] All buttons responsive
[ ] Form validation works
```

#### Browser Testing
```
[ ] Chrome desktop
[ ] Firefox desktop
[ ] Safari desktop
[ ] Chrome mobile
[ ] Safari mobile
[ ] Edge desktop
```

#### Accessibility Testing
```
[ ] Keyboard navigation works
[ ] Screen reader compatible
[ ] Color contrast sufficient
[ ] Text resize works
[ ] No WCAG violations
```

#### Performance Testing
```
[ ] Page load time < 7s
[ ] Emotion detection < 200ms
[ ] No memory leaks
[ ] Console has no errors
[ ] No performance warnings
```

---

## 📤 Pull Request Process

### PR Title Format
```
[TYPE] Brief description

Types:
- [FEATURE] for new features
- [FIX] for bug fixes
- [DOCS] for documentation
- [UI] for UI/UX changes
- [REFACTOR] for code refactoring
- [CHORE] for maintenance tasks

Examples:
[FEATURE] Add analytics dashboard
[FIX] Fix emotion detection crash on Safari
[DOCS] Update API reference
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] UI/UX improvement
- [ ] Refactoring

## Related Issues
Fixes #(issue number)

## Changes Made
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Testing Done
- Tested in Chrome
- Tested on mobile
- Tested emotion detection
- etc.

## Screenshots (if applicable)
[Attach screenshots]

## Checklist
- [ ] Code follows style guide
- [ ] Self-reviewed code
- [ ] Comments added for complex areas
- [ ] Documentation updated
- [ ] Tests done
- [ ] No breaking changes
- [ ] Performance impact minimal
```

### PR Review Process
```
1. Automated checks run (CI/CD)
2. Manual review by maintainers
3. Feedback provided (if needed)
4. Changes requested or approved
5. Merge into main branch
6. Deploy to GitHub Pages
```

---

## 🔍 Code Review Guidelines

### What Reviewers Look For:
```
✅ Code quality and standards compliance
✅ No breaking changes
✅ Performance impact acceptable
✅ Security considerations
✅ Cross-browser compatibility
✅ Accessibility compliance
✅ Documentation clarity
✅ Testing completeness
```

### How to Handle Feedback:
```
1. Read feedback carefully
2. Ask clarifying questions if needed
3. Make requested changes
4. Reply to comments
5. Re-request review
6. Iterate until approved
```

---

## 🎓 Learning Resources

### Understanding the Codebase
```
Start with:
1. README.md - Overview
2. INSTALLATION.md - Setup guide
3. API_REFERENCE.md - Function reference
4. index.html - UI structure
5. ai-engine.js - AI logic
6. app.js - App flow
```

### Face-API.js Resources
```
- Docs: https://github.com/vladmandic/face-api
- Models: https://github.com/vladmandic/face-api/tree/master/model
- Examples: https://github.com/vladmandic/face-api/tree/master/examples
```

### Web APIs
```
- MDN Web Docs: https://developer.mozilla.org/
- Web Cameras: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Web Audio: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
```

---

## 🐛 Bug Reports

### How to Report Bugs

Use GitHub Issues with this template:
```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots/Videos
[Attach if applicable]

## Environment
- Browser: Chrome 95
- OS: Windows 10
- Device: Desktop

## Console Errors
[Paste any error messages]

## Additional Info
Any other relevant information
```

---

## 🎉 Getting Recognized

### Contributor Recognition
```
Your contributions will be:
✅ Listed in README.md
✅ Credited in CHANGELOG.md
✅ Mentioned in releases
✅ Appreciated publicly! 🙌
```

### Contribution Tiers
```
🥉 Bronze (1-2 contributions)
🥈 Silver (3-5 contributions)
🥇 Gold (6+ contributions)
👑 Core (10+ or long-term)
```

---

## 📞 Support & Questions

### Getting Help
```
- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Email: stokfebe@gmail.com
- Twitter: @stokfebe
```

### Before Asking:
```
1. Check existing issues/discussions
2. Read documentation
3. Search online
4. Test in isolation
5. Then ask with details
```

---

## ✅ Contribution Checklist

Before submitting PR, verify:
```
[ ] Fork and clone repo
[ ] Created feature branch
[ ] Made meaningful changes
[ ] Followed code standards
[ ] Tested locally in multiple browsers
[ ] Updated documentation
[ ] No console errors/warnings
[ ] Commit message is clear
[ ] PR description is complete
[ ] No unrelated changes included
[ ] Ready for review
```

---

## 🚫 What Not to Do

```
❌ Don't submit without testing
❌ Don't ignore code review feedback
❌ Don't mix multiple unrelated changes
❌ Don't update dependencies without reason
❌ Don't remove existing features
❌ Don't break backward compatibility
❌ Don't submit incomplete work
❌ Don't be disrespectful in discussions
```

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make nasipadangMAX better!

We appreciate:
- 🐛 Bug reports and fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 💬 Feedback and suggestions
- 🤝 Mentoring others

---

**Questions?** Start a discussion or email stokfebe@gmail.com

**Happy contributing!** 🚀

---

**Last Updated:** 2026-06-29
**Document Version:** 1.0.0
**Status:** ✅ Active & Maintained
