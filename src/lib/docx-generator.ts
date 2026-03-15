import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";

/**
 * Convert plain text federal resume to a professionally formatted DOCX document
 */
export async function generateDocxResume(resumeText: string): Promise<Buffer> {
  // Parse the resume text into sections
  const sections = parseResumeText(resumeText);
  
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "ContactBlock",
          name: "Contact Block",
          basedOn: "Normal",
          next: "Normal",
          paragraph: {
            spacing: { after: 200 },
            alignment: AlignmentType.CENTER,
          },
          run: {
            size: 24,
            font: "Calibri",
          },
        },
        {
          id: "SectionHeader",
          name: "Section Header", 
          basedOn: "Normal",
          next: "Normal",
          paragraph: {
            spacing: { before: 300, after: 150 },
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000",
              },
            },
          },
          run: {
            bold: true,
            size: 28,
            font: "Calibri",
            allCaps: true,
          },
        },
        {
          id: "JobTitle",
          name: "Job Title",
          basedOn: "Normal", 
          next: "Normal",
          paragraph: {
            spacing: { before: 200, after: 100 },
          },
          run: {
            bold: true,
            size: 24,
            font: "Calibri",
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,   // 0.5 inch
              right: 720, // 0.5 inch  
              bottom: 720, // 0.5 inch
              left: 720,  // 0.5 inch
            },
          },
        },
        children: buildDocumentChildren(sections),
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

interface ResumeSection {
  title: string;
  content: string;
  isContactBlock?: boolean;
  isWorkExperience?: boolean;
}

function parseResumeText(text: string): ResumeSection[] {
  const lines = text.split('\n');
  const sections: ResumeSection[] = [];
  let currentSection: ResumeSection | null = null;
  let isContactBlock = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if this is a section header (ALL CAPS sections)
    if (isAllCapsSection(line)) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        title: line,
        content: "",
        isContactBlock: false,
        isWorkExperience: line.includes('WORK EXPERIENCE') || line.includes('EMPLOYMENT HISTORY'),
      };
      isContactBlock = false;
    }
    // Handle contact block (first few lines before any section headers)
    else if (isContactBlock) {
      if (!currentSection) {
        currentSection = {
          title: "",
          content: "",
          isContactBlock: true,
        };
      }
      currentSection.content += line + '\n';
    }
    // Regular content line
    else if (currentSection) {
      currentSection.content += line + '\n';
    }
  }
  
  // Add final section
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}

function isAllCapsSection(line: string): boolean {
  // Check if line is likely a section header
  const trimmed = line.trim();
  if (trimmed.length < 3) return false;
  
  const sectionKeywords = [
    'WORK EXPERIENCE', 'EMPLOYMENT HISTORY', 'PROFESSIONAL EXPERIENCE',
    'EDUCATION', 'CERTIFICATIONS', 'TRAINING', 'SKILLS', 'KNOWLEDGE',
    'ADDITIONAL INFORMATION', 'AWARDS', 'ACCOMPLISHMENTS', 'SUMMARY',
    'PROFESSIONAL SUMMARY', 'QUALIFICATIONS', 'SPECIALIZED EXPERIENCE'
  ];
  
  return sectionKeywords.some(keyword => trimmed.toUpperCase().includes(keyword)) ||
         (trimmed === trimmed.toUpperCase() && trimmed.includes(' ') && !trimmed.includes('@'));
}

function buildDocumentChildren(sections: ResumeSection[]): Paragraph[] {
  const children: Paragraph[] = [];
  
  sections.forEach(section => {
    if (section.isContactBlock) {
      // Format contact block
      const contactLines = section.content.trim().split('\n');
      contactLines.forEach(line => {
        if (line.trim()) {
          children.push(new Paragraph({
            style: "ContactBlock",
            children: [new TextRun(line.trim())],
          }));
        }
      });
    } else {
      // Add section header
      if (section.title) {
        children.push(new Paragraph({
          style: "SectionHeader", 
          children: [new TextRun(section.title)],
        }));
      }
      
      // Process section content
      if (section.isWorkExperience) {
        children.push(...formatWorkExperience(section.content));
      } else {
        children.push(...formatRegularSection(section.content));
      }
    }
  });
  
  return children;
}

function formatWorkExperience(content: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const lines = content.trim().split('\n');
  
  let currentJob: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentJob.length > 0) {
        paragraphs.push(...formatSingleJob(currentJob));
        currentJob = [];
        // Add spacing between jobs
        paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      }
      continue;
    }
    
    // Check if this looks like a new job title (not starting with - or •)
    if (!trimmed.startsWith('-') && !trimmed.startsWith('•') && !trimmed.startsWith('Supervisor:') && 
        !trimmed.includes('Hours per week:') && !trimmed.includes('Salary:')) {
      // If we have a current job, save it
      if (currentJob.length > 0) {
        paragraphs.push(...formatSingleJob(currentJob));
        currentJob = [];
        paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      }
    }
    
    currentJob.push(trimmed);
  }
  
  // Handle final job
  if (currentJob.length > 0) {
    paragraphs.push(...formatSingleJob(currentJob));
  }
  
  return paragraphs;
}

function formatSingleJob(jobLines: string[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  
  if (jobLines.length === 0) return paragraphs;
  
  // First line is usually job title
  paragraphs.push(new Paragraph({
    style: "JobTitle",
    children: [new TextRun(jobLines[0])],
  }));
  
  // Process remaining lines
  for (let i = 1; i < jobLines.length; i++) {
    const line = jobLines[i];
    
    if (line.startsWith('-') || line.startsWith('•')) {
      // Bullet point - format as accomplishment
      paragraphs.push(new Paragraph({
        children: [new TextRun(line)],
        bullet: { level: 0 },
        spacing: { before: 100, after: 100 },
      }));
    } else {
      // Regular job details (dates, supervisor, etc.)
      paragraphs.push(new Paragraph({
        children: [new TextRun(line)],
        spacing: { after: 50 },
      }));
    }
  }
  
  return paragraphs;
}

function formatRegularSection(content: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const lines = content.trim().split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed) {
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        // Bullet point
        paragraphs.push(new Paragraph({
          children: [new TextRun(trimmed)],
          bullet: { level: 0 },
          spacing: { before: 100, after: 100 },
        }));
      } else {
        // Regular paragraph
        paragraphs.push(new Paragraph({
          children: [new TextRun(trimmed)],
          spacing: { after: 120 },
        }));
      }
    }
  }
  
  return paragraphs;
}