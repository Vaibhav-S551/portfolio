const express = require('express');
const router = express.Router();
const personalData = require('../config/personalData.json');

function generateResponse(query) {
  const q = query.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|howdy|greetings|sup|yo)\b/.test(q)) {
    return `👋 Hey there! I'm Vaibhav's portfolio assistant. I can help you learn about Vaibhav's skills, projects, experience, education, and contact info. What would you like to know?`;
  }

  // Name
  if (q.includes('name') || q.includes('who are you') || q.includes('who is vaibhav')) {
    return `I'm the portfolio assistant for **${personalData.name}**, a ${personalData.title} based in ${personalData.location}.`;
  }

  // Education
  if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('university') || q.includes('college') || q.includes('gpa') || q.includes('qualification')) {
    const edu = personalData.education[0];
    return `🎓 **Education**\n\n**${edu.degree}**\n${edu.institution} — ${edu.year}\nGPA: ${edu.gpa}`;
  }

  // Skills
  if (q.includes('skill') || q.includes('technologies') || q.includes('tech stack') || q.includes('know') || q.includes('language') || q.includes('framework') || q.includes('tools')) {
    return `🛠️ **Skills & Technologies**\n\n${personalData.skills.join(' • ')}`;
  }

  // Experience
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('company') || q.includes('career') || q.includes('position') || q.includes('role')) {
    const exp = personalData.experience.map(e =>
      `**${e.role}** at ${e.company} (${e.duration})\n${e.description}`
    ).join('\n\n');
    return `💼 **Work Experience**\n\n${exp}`;
  }

  // Projects
  if (q.includes('project') || q.includes('build') || q.includes('built') || q.includes('portfolio work') || q.includes('application') || q.includes('app')) {
    const projs = personalData.projects.map(p =>
      `**${p.name}**\n${p.description}\nTech: ${p.tech.join(', ')}`
    ).join('\n\n');
    return `🚀 **Projects**\n\n${projs}`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('available') || q.includes('phone') || q.includes('connect')) {
    return `📬 **Contact Info**\n\n📧 Email: ${personalData.email}\n📍 Location: ${personalData.location}\n🐙 GitHub: ${personalData.github}\n💼 LinkedIn: ${personalData.linkedin}`;
  }

  // Certificates
  if (q.includes('certificate') || q.includes('certification') || q.includes('certified') || q.includes('credential')) {
    return `🏅 **Certifications**\n\n${personalData.certifications.map(c => `• ${c}`).join('\n')}`;
  }

  // GitHub
  if (q.includes('github') || q.includes('code') || q.includes('repository') || q.includes('repo')) {
    return `🐙 **GitHub**: ${personalData.github}\n\nFeel free to check out Alex's open source projects and contributions!`;
  }

  // LinkedIn
  if (q.includes('linkedin')) {
    return `💼 **LinkedIn**: ${personalData.linkedin}\n\nConnect with Alex for professional opportunities!`;
  }

  // Location
  if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('based')) {
    return `📍 Alex is based in **${personalData.location}**.`;
  }

  // Default
  return `🤔 I can help you learn about Vaibhav's:\n\n• **Education** — ask "what's your education?"\n• **Skills** — ask "what are your skills?"\n• **Experience** — ask "what's your work experience?"\n• **Projects** — ask "tell me about your projects"\n• **Contact** — ask "how can I contact you?"\n• **Certifications** — ask "what certifications do you have?"\n\nWhat would you like to know?`;
}

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Optional: OpenAI integration
    if (process.env.OPENAI_API_KEY) {
      try {
        const { OpenAI } = require('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a portfolio assistant for ${personalData.name}. 
Answer questions based only on this data: ${JSON.stringify(personalData)}.
Be concise, friendly, and use emojis. Format with markdown.`
            },
            { role: 'user', content: message }
          ],
          max_tokens: 300
        });

        return res.json({
          success: true,
          reply: completion.choices[0].message.content,
          mode: 'ai'
        });
      } catch (aiErr) {
        console.error('OpenAI error, falling back to rule-based:', aiErr.message);
      }
    }

    // Rule-based fallback
    const reply = generateResponse(message);
    res.json({ success: true, reply, mode: 'rule-based' });

  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ success: false, message: 'Chat service error' });
  }
});

module.exports = router;
