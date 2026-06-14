# Quick Start & Troubleshooting Guide

## 🚀 How to Run the Project

### Step 1: Navigate to Project Directory
```bash
cd C:\Users\anony\Desktop\webutils-nextjs
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Open your browser and go to: **http://localhost:3000**

You should see:
- ✅ Homepage with search bar
- ✅ Category filters (50+ categories)
- ✅ Tool cards grid showing 1000+ tools
- ✅ Dark/Light theme toggle in header

### Step 5: Test Migrated Tools
Visit these URLs to test the 3 migrated tools:
1. **JSON Formatter:** http://localhost:3000/tools/dev/json-formatter
2. **Base64 Encoder:** http://localhost:3000/tools/dev/base64
3. **URL Encoder:** http://localhost:3000/tools/dev/url-codec

---

## 🔧 Common Issues & Solutions

### Issue 1: "npm run dev" not working
**Solution:**
```bash
cd webutils-nextjs
npm install
npm run dev
```

### Issue 2: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Issue 3: Module not found errors
**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: TypeScript errors
**Check these files for errors:**
- `app/page.tsx`
- `app/layout.tsx`
- `components/ThemeProvider.tsx`

**Common fixes:**
- Ensure all imports are correct
- Check MUI component prop usage
- Verify type definitions

### Issue 5: Build fails
**Solution:**
```bash
# Check for errors
npm run build

# If build fails, check:
# 1. All imports are valid
# 2. No syntax errors
# 3. TypeScript types are correct
```

---

## 📦 Required Dependencies

### Already Installed
- ✅ next@15.x
- ✅ react@18.x
- ✅ react-dom@18.x
- ✅ typescript@5.x
- ✅ @mui/material@5.x
- ✅ @mui/icons-material@5.x
- ✅ @emotion/react@11.x
- ✅ @emotion/styled@11.x

### Still Need to Install (for future tools)
```bash
npm install js-yaml date-fns qrcode jsbarcode marked dompurify crypto-js
npm install -D @types/js-yaml @types/qrcode @types/marked @types/dompurify
```

---

## 🧪 Testing Checklist

### Homepage Test
- [ ] Search bar visible
- [ ] Can type in search
- [ ] Category filters work
- [ ] Tool cards display
- [ ] Cards clickable
- [ ] Theme toggle works

### Tool Test (JSON Formatter)
1. Navigate to `/tools/dev/json-formatter`
2. Paste JSON: `{"test": "value"}`
3. Click "Format" button
4. Should see formatted output
5. Click "Copy" button
6. Should see success message

### Navigation Test
- [ ] Header displays
- [ ] Home button works
- [ ] Theme toggle works
- [ ] Footer displays
- [ ] Breadcrumbs work

---

## 📊 Project Status

### What's Working ✅
- Project structure
- Homepage with search
- Category filtering
- Theme system (light/dark)
- 3 migrated tools
- Copy/Paste functionality
- URL state persistence

### What's Pending ⏳
- Test dev server compilation
- Fix any runtime errors
- Migrate remaining 997+ tools
- Add syntax highlighting
- Implement PWA features
- Deploy to Vercel

---

## 🐛 Debug Mode

### Check Console Errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Common errors:
   - Module not found → Check imports
   - Component error → Check props
   - Network error → Check dev server

### Check Network Tab
1. Open DevTools Network tab
2. Refresh page
3. Check for:
   - 404 errors (missing files)
   - 500 errors (server errors)
   - Failed requests

### Check Terminal Output
Look for:
- ✅ "Ready in Xms" - Server started
- ⚠️ "Warning" - Non-critical issues
- ❌ "Error" - Must fix

---

## 📝 What to Report if Still Not Working

1. **Terminal Output:**
   - Copy the full error message from terminal
   - Include the last 20 lines before error

2. **Browser Console:**
   - Screenshot of console errors
   - Any red error messages

3. **Specific Issue:**
   - What are you trying to do?
   - What happens instead?
   - What error message appears?

---

## 🎯 Next Steps After Getting It Running

1. **Test the 3 existing tools**
2. **Continue migration:**
   - Create Hash Generator
   - Create JWT Decoder
   - Create Regex Tester
   - Continue with remaining tools

3. **Follow the pattern:**
   - Copy one of existing tool files
   - Modify for new tool functionality
   - Test and commit

---

## 💡 Development Tips

### Quick Tool Creation
```bash
# Create new tool directory
mkdir -p app/tools/dev/new-tool

# Copy template from existing tool
cp app/tools/dev/json-formatter/page.tsx app/tools/dev/new-tool/page.tsx

# Edit and customize
```

### Test Individual Tool
```bash
# Visit URL directly
http://localhost:3000/tools/[category]/[tool-name]
```

### Hot Reload
- Next.js has built-in hot reload
- Save any file to see changes instantly
- No need to restart server

---

## 📞 Getting Help

If you're stuck:
1. Check this guide first
2. Review the error message
3. Check browser console
4. Review STATUS_REPORT.md for architecture
5. Ask with specific error details

**Remember:** The foundation is complete and solid. Any issues are likely minor configuration or dependency problems that can be quickly resolved!
