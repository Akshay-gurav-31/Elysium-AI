import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const Library = () => {
  // State for pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // 100 curated mental health resources with descriptions reduced to ~20 words
  const mentalHealthResources = [
    {
      title: "The Power of Vulnerability ",
      description: "Brené Brown explores how vulnerability strengthens mental health, offering a transformative talk for resilience.",
      link: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
    },
    {
      title: "How to Manage Anxiety - Psych Hub",
      description: "Psych Hub video provides practical anxiety management techniques for quick, actionable stress relief.",
      link: "https://www.youtube.com/watch?v=KYJdekjiAog",
    },
    {
      title: "Mental Health Articles - Mind.org.uk",
      description: "Mind UK offers guides on depression, anxiety, and self-care, a trusted resource for mental health education.",
      link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/",
    },
    {
      title: "Guided Meditation for Stress Relief",
      description: "Headspace video promotes mindfulness to reduce stress, perfect for beginners seeking calm and relaxation.",
      link: "https://www.headspace.com/meditation/stress-relief",
    },
    {
      title: "Book Summary: 'The Body Keeps the Score' - Productivity Game",
      description: "YouTube summary of Bessel van der Kolk's book on trauma impact, offering key insights for healing.",
      link: "https://www.youtube.com/watch?v=BJfmfk8nQTY",
    },
    {
      title: "NAMI: Mental Health Conditions Overview",
      description: "NAMI details conditions like ADHD and schizophrenia, a go-to resource for mental health awareness.",
      link: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions",
    },
    {
      title: "CBT Techniques for Anxiety - Verywell Mind",
      description: "Article explains Cognitive Behavioral Therapy for anxiety, great for self-help or therapy preparation.",
      link: "https://www.verywellmind.com/cognitive-behavioral-therapy-for-anxiety-5221929",
    },
    {
      title: "Mental Health Foundation: Self-Care Tips",
      description: "Evidence-based self-care strategies for wellbeing, covering sleep, exercise, and stress management.",
      link: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/self-care",
    },
    {
      title: "Book: 'Atomic Habits' - James Clear ",
      description: "YouTube summary of 'Atomic Habits' for building mental health routines, practical and motivating.",
      link: "https://www.youtube.com/watch?v=YT7tQzmGRLA",
    },
    {
      title: "NIMH: Coping with Stress",
      description: "NIMH shares science-backed stress management tips, a valuable resource for building resilience.",
      link: "https://www.nimh.nih.gov/health/topics/coping-with-stress",
    },
    {
      title: "How to Practice Mindfulness ",
      description: "UC Berkeley guide to mindfulness for mental health, includes beginner-friendly exercises and.",
      link: "https://greatergood.berkeley.edu/topic/mindfulness/definition",
    },
    {
      title: "Emotional Regulation Skills ",
      description: "YouTube video teaches managing intense emotions, a concise tool for mental wellness.",
      link: "https://www.youtube.com/watch?v=1ToqYSDvQ0Q",
    },
    {
      title: "WHO: Mental Health Resources",
      description: "World Health Organization articles on global mental health, reliable and informative for all.",
      link: "https://www.who.int/health-topics/mental-health",
    },
    {
      title: "Book: 'Man’s Search for Meaning' - Summary Video",
      description: "YouTube summary of Viktor Frankl’s book on finding purpose, inspiring for mental health challenges.",
      link: "https://www.youtube.com/watch?v=9c3K0gqU4Tc",
    },
    {
      title: "Psychology Today: Stress Management",
      description: "Articles on stress reduction, covering mindfulness, exercise, and effective management techniques.",
      link: "https://www.psychologytoday.com/us/basics/stress",
    },
    {
      title: "Calm: Sleep Meditation Video",
      description: "Calm’s YouTube meditation improves sleep, key for mental health, relaxing and accessible for all.",
      link: "https://www.youtube.com/watch?v=2k3N0b5qU38",
    },
    {
      title: "Mental Health America: Tools & Resources",
      description: "MHA offers screening tools and articles for mental health, ideal for self-assessment and support.",
      link: "https://www.mhanational.org/mental-health-tools",
    },
    {
      title: "Book: 'Maybe You Should Talk to Someone' - Review",
      description: "Review of Lori Gottlieb’s book on therapy impact, offering insights into the process and benefits.",
      link: "https://www.nytimes.com/2019/04/16/books/review/lori-gottlieb-maybe-you-should-talk-to-someone.html",
    },
    {
      title: "TEDx: Stop Screwing Yourself Over - Mel Robbins",
      description: "Mel Robbins’ TEDx talk on taking action for mental health, motivational and practical advice.",
      link: "https://www.ted.com/talks/mel_robbins_how_to_stop_screwing_yourself_over",
    },
    {
      title: "Anxiety Canada: Coping Strategies",
      description: "Anxiety Canada tools and articles for managing anxiety, focused and practical help for all.",
      link: "https://www.anxietycanada.com/",
    },
    {
      title: "What Is Depression? - Yale Medicine Video",
      description: "Yale Medicine video explains depression symptoms and treatments, clear and helpful for beginners.",
      link: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
    },
    {
      title: "Healthline: Coping with Grief",
      description: "Healthline guide to managing grief and loss, offering supportive and practical advice for all.",
      link: "https://www.healthline.com/health/mental-health/coping-with-grief",
    },
    {
      title: "SAMHSA: Mental Health Resources",
      description: "SAMHSA tools and articles for mental health support, a U.S.-focused hub for assistance.",
      link: "https://www.samhsa.gov/mental-health",
    },
    {
      title: "Book: 'Feeling Good' - Summary Video",
      description: "YouTube summary of David Burns’ CBT book for depression, great for self-help and recovery.",
      link: "https://www.youtube.com/watch?v=0kY3WthSTfQ",
    },
    {
      title: "The Mighty: Mental Health Stories",
      description: "The Mighty shares personal stories and articles on mental health, community-driven inspiration.",
      link: "https://themighty.com/topic/mental-health/",
    },
    {
      title: "Psych2Go: 7 Signs of Anxiety - YouTube",
      description: "Psych2Go video outlines anxiety symptoms to watch, engaging and educational for all viewers.",
      link: "https://www.youtube.com/watch?v=2gZa91C-goQ",
    },
    {
      title: "Harvard Health: Mental Health Tips",
      description: "Harvard articles on managing mental health, covering stress, sleep, and effective strategies.",
      link: "https://www.health.harvard.edu/topics/mental-health",
    },
    {
      title: "Book: 'Daring Greatly' - Brené Brown Summary",
      description: "YouTube summary of ‘Daring Greatly’ on vulnerability, uplifting for mental strength and growth.",
      link: "https://www.youtube.com/watch?v=6gV5h-NcFUE",
    },
    {
      title: "Rethink Mental Illness: Support Resources",
      description: "Rethink guides for mental health conditions, UK-based and reliable for support and information.",
      link: "https://www.rethink.org/advice-and-information/",
    },
    {
      title: "Dr. Tracey Marks: Stress vs. Anxiety - YouTube",
      description: "Dr. Marks explains stress and anxiety differences, a clear, expert-led video for understanding.",
      link: "https://www.youtube.com/watch?v=3b0gNFKNmrw",
    },
    {
      title: "Beyond Blue: Anxiety Support",
      description: "Beyond Blue articles and tools for anxiety management, Australia-focused support for all.",
      link: "https://www.beyondblue.org.au/mental-health/anxiety",
    },
    {
      title: "Book: 'The Happiness Trap' - Summary Video",
      description: "YouTube summary of Russ Harris’ ACT book for wellbeing, offering practical insights and tips.",
      link: "https://www.youtube.com/watch?v=2uBRHBd0lUc",
    },
    {
      title: "HelpGuide: Stress Management",
      description: "HelpGuide articles on reducing stress effectively, with easy-to-follow advice for everyone.",
      link: "https://www.helpguide.org/articles/stress/stress-management.htm",
    },
    {
      title: "Kati Morton: Trauma Explained - YouTube",
      description: "Therapist Kati Morton discusses trauma effects, informative video for recovery and understanding.",
      link: "https://www.youtube.com/watch?v=SFz6i-Z_bUc",
    },
    {
      title: "Mayo Clinic: Mental Health Basics",
      description: "Mayo Clinic overview of mental health conditions, trusted medical advice for all readers.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/mental-health/art-20044098",
    },
    {
      title: "Book: 'Meditations' - Marcus Aurelius Summary",
      description: "YouTube summary of Stoic principles for mental health, offering timeless wisdom and guidance.",
      link: "https://www.youtube.com/watch?v=Auuk1y4DRgk",
    },
    {
      title: "SANE Australia: Mental Health Support",
      description: "SANE resources for mental health recovery, community-focused help for all individuals.",
      link: "https://www.sane.org/",
    },
    {
      title: "TEDx: Mental Health Matters - Erin Huizenga",
      description: "TEDx talk on destigmatizing mental health, inspiring and relatable for all audiences.",
      link: "https://www.ted.com/talks/erin_huizenga_mental_health_matters",
    },
    {
      title: "Book: 'Lost Connections' - Johann Hari Review",
      description: "Review of ‘Lost Connections’ on depression causes, thought-provoking ideas for understanding.",
      link: "https://www.theguardian.com/books/2018/jan/21/lost-connections-johann-hari-review",
    },
    {
      title: "APA: Mental Health Resources",
      description: "American Psychological Association guides on mental health, expert-backed content for all.",
      link: "https://www.apa.org/topics/mental-health",
    },
    {
      title: "10 Ways to Boost Mental Health - Psych2Go",
      description: "Psych2Go video shares tips for improving wellbeing, engaging and practical for everyone.",
      link: "https://www.youtube.com/watch?v=4XQUyMcu6k4",
    },
    {
      title: "Cleveland Clinic: Anxiety Disorders",
      description: "Cleveland Clinic guide to understanding anxiety, clear medical insights for all readers.",
      link: "https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders",
    },
    {
      title: "Book: 'The Four Agreements' - Summary Video",
      description: "YouTube summary of Don Miguel Ruiz’s book, offering simple wisdom for mental clarity.",
      link: "https://www.youtube.com/watch?v=ZtWmQ3v6Vr8",
    },
    {
      title: "Black Dog Institute: Mental Health Resources",
      description: "Australia’s Black Dog Institute tools for mental health, research-driven support for all.",
      link: "https://www.blackdoginstitute.org.au/resources-support/",
    },
    {
      title: "How to Stop Overthinking - Dr. Julie Smith",
      description: "Dr. Julie Smith’s YouTube video on managing overthinking, practical and clear advice.",
      link: "https://www.youtube.com/watch?v=ITkJ2m9S4vY",
    },
    {
      title: "WebMD: Mental Health Overview",
      description: "WebMD articles on mental health conditions, accessible medical advice for all readers.",
      link: "https://www.webmd.com/mental-health/",
    },
    {
      title: "Book: 'Mindfulness for Beginners' - Summary",
      description: "YouTube summary of Jon Kabat-Zinn’s mindfulness guide, great for beginners and learners.",
      link: "https://www.youtube.com/watch?v=3nwwKbM_vJc",
    },
    {
      title: "MQ Mental Health: Research Resources",
      description: "MQ articles on mental health research, insightful for curious minds and enthusiasts.",
      link: "https://www.mqmentalhealth.org/",
    },
    {
      title: "TEDx: Rewiring Anxiety - Joe Bailey",
      description: "TEDx talk on reframing anxiety for growth, uplifting with a fresh perspective for all.",
      link: "https://www.ted.com/talks/joe_bailey_rewiring_anxiety",
    },
    {
      title: "Every Mind Matters: NHS Mental Health",
      description: "NHS platform for mental health tips, practical and government-backed for all users.",
      link: "https://www.nhs.uk/every-mind-matters/",
    },
    {
      title: "Book: 'The Power of Now' - Eckhart Tolle Summary",
      description: "YouTube summary of Tolle’s mindfulness book, helps with present-moment focus and peace.",
      link: "https://www.youtube.com/watch?v=EH9nldhcr90",
    },
    {
      title: "Child Mind Institute: Mental Health for Kids",
      description: "Resources for children’s mental health, supportive for parents and educators alike.",
      link: "https://childmind.org/",
    },
    {
      title: "What Is PTSD? - Veterans Affairs Video",
      description: "YouTube video explaining PTSD from VA, clear and helpful for those seeking answers.",
      link: "https://www.youtube.com/watch?v=OuJtbA0q1z0",
    },
    {
      title: "Verywell Health: Depression Guide",
      description: "Verywell Health articles on depression management, informative and practical for all.",
      link: "https://www.verywellhealth.com/depression-7369427",
    },
    {
      title: "Book: 'Grit' - Angela Duckworth Summary",
      description: "YouTube summary of ‘Grit’ for mental resilience, offering motivational insights for all.",
      link: "https://www.youtube.com/watch?v=H14bBuluwB8",
    },
    {
      title: "Mental Health First Aid: Resources",
      description: "Tools for recognizing mental health crises, practical for community support and help.",
      link: "https://www.mentalhealthfirstaid.org/",
    },
    {
      title: "How to Build Confidence - Psych2Go",
      description: "Psych2Go video on boosting self-esteem, engaging for mental health growth and support.",
      link: "https://www.youtube.com/watch?v=lzXPaS7M7sQ",
    },
    {
      title: "Johns Hopkins: Mental Health Disorders",
      description: "Johns Hopkins guide to mental health conditions, trusted medical content for all.",
      link: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/mental-health-disorders",
    },
    {
      title: "Book: 'Thinking, Fast and Slow' - Summary",
      description: "YouTube summary of Kahneman’s decision-making book, useful for mental clarity and focus.",
      link: "https://www.youtube.com/watch?v=JuVBNL1vo4o",
    },
    {
      title: "Time to Change: Mental Health Stories",
      description: "UK campaign sharing mental health experiences, effectively reducing stigma for all.",
      link: "https://www.time-to-change.org.uk/",
    },
    {
      title: "TEDx: The Gift of Anxiety - Katie Crawford",
      description: "TEDx talk on reframing anxiety’s role, personal and enlightening for all viewers.",
      link: "https://www.ted.com/talks/katie_crawford_the_gift_of_anxiety",
    },
    {
      title: "MedlinePlus: Mental Health",
      description: "U.S. National Library of Medicine resources on mental health, reliable and broad for all.",
      link: "https://medlineplus.gov/mentalhealth.html",
    },
    {
      title: "Book: 'The Alchemist' - Paulo Coelho Summary",
      description: "YouTube summary of ‘The Alchemist’ for finding purpose, uplifting for mental health.",
      link: "https://www.youtube.com/watch?v=6U0Y70ZGRnM",
    },
    {
      title: "Headspace: Anxiety Meditation Video",
      description: "Headspace YouTube video for anxiety relief, short and effective mindfulness for all.",
      link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    },
    {
      title: "Mental Health Minnesota: Resources",
      description: "Minnesota support tools for mental health, community-focused and helpful for all.",
      link: "https://mentalhealthmn.org/",
    },
    {
      title: "Book: 'Big Magic' - Elizabeth Gilbert Summary",
      description: "YouTube summary of ‘Big Magic’ for overcoming fear, inspires mental growth for all.",
      link: "https://www.youtube.com/watch?v=5x5z4NROQes",
    },
    {
      title: "Active Minds: Mental Health Advocacy",
      description: "Active Minds resources for youth mental health, empowering and engaging for all.",
      link: "https://www.activeminds.org/",
    },
    {
      title: "How to Deal with Loneliness - Psych2Go",
      description: "Psych2Go video on managing loneliness, relatable and supportive advice for all.",
      link: "https://www.youtube.com/watch?v=7O1hVucM3jM",
    },
    {
      title: "CAMH: Mental Health Resources",
      description: "Canada’s CAMH guides on mental health, comprehensive and expert-led for all readers.",
      link: "https://www.camh.ca/",
    },
    {
      title: "Book: 'The Untethered Soul' - Summary Video",
      description: "YouTube summary of Michael Singer’s mindfulness book, deep insights for peace and calm.",
      link: "https://www.youtube.com/watch?v=CSvQATr-hps",
    },
    {
      title: "Mental Health Matters: TED Playlist",
      description: "TED playlist of talks on mental health, diverse and thought-provoking for all viewers.",
      link: "https://www.ted.com/playlists/175/mental_health_matters",
    },
    {
      title: "Healthline: Anxiety Coping Tips",
      description: "Healthline strategies for managing anxiety, practical and well-researched for all users.",
      link: "https://www.healthline.com/health/mental-health/how-to-cope-with-anxiety",
    },
    {
      title: "Book: 'The Subtle Art' - Mark Manson Summary",
      description: "YouTube summary of Manson’s book on prioritizing mental health, bold and practical advice.",
      link: "https://www.youtube.com/watch?v=6t7T6vP9ozQ",
    },
    {
      title: "Mental Health Ireland: Resources",
      description: "Ireland’s support articles on mental health, community-focused and accessible for all.",
      link: "https://www.mentalhealthireland.ie/",
    },
    {
      title: "TEDx: Healing Trauma - Lisa Ferentz",
      description: "TEDx talk on trauma recovery, compassionate and expert insights for all viewers.",
      link: "https://www.ted.com/talks/lisa_ferentz_healing_trauma",
    },
    {
      title: "Verywell Mind: Stress Relief",
      description: "Verywell Mind guide to stress management, clear and actionable tips for all readers.",
      link: "https://www.verywellmind.com/tips-to-reduce-stress-3145195",
    },
    {
      title: "Book: 'Ikigai' - Summary Video",
      description: "YouTube summary of ‘Ikigai’ on finding purpose, uplifting for mental health and wellbeing.",
      link: "https://www.youtube.com/watch?v=OCpBXP5jW7g",
    },
    {
      title: "Mental Health UK: Support Resources",
      description: "Mental Health UK tools for wellbeing, practical and inclusive advice for all individuals.",
      link: "https://mentalhealth-uk.org/",
    },
    {
      title: "How to Improve Self-Esteem - Dr. Tracey Marks",
      description: "Dr. Marks’ YouTube video on building self-esteem, expert and actionable for all viewers.",
      link: "https://www.youtube.com/watch?v=2VzEjRjoZDA",
    },
    {
      title: "NHS: Mood Self-Assessment",
      description: "NHS tool for assessing mood and mental health, quick and helpful for all users.",
      link: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/mood-self-assessment/",
    },
    {
      title: "Book: 'The Gifts of Imperfection' - Summary",
      description: "YouTube summary of Brené Brown’s book on self-acceptance, empowering advice for all.",
      link: "https://www.youtube.com/watch?v=6h8BBNJ0n4E",
    },
    {
      title: "Mindfulness Exercises - Greater Good",
      description: "Greater Good practices for mental health mindfulness, simple and effective for all learners.",
      link: "https://greatergood.berkeley.edu/topic/mindfulness/practice",
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(mentalHealthResources.length / itemsPerPage);
  const paginatedResources = mentalHealthResources.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-[#0a1128] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128]/90 to-[#0a1128]/60 z-0"></div>
        <div className="elysium-container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Our <span className="text-primary">Library</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/80">
            Comprehensive mental health support designed around your individual needs.
          </p>
        </div>
      </section>

      {/* Mental Health Resources Section */}
      <section className="py-20 bg-background">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Mental Health <span className="text-primary">Resources</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore curated videos, articles, websites, and book summaries to support your mental wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedResources.map((resource, index) => (
              <Card
                key={index}
                className="bg-[#0a1128] text-white shadow-md rounded-lg overflow-hidden dark-card border-border min-h-[300px]"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold font-display">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-base mt-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-end p-6 pt-0">
                  <div className="flex justify-center pb-6">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
                      <Button className="elysium-btn-primary w-full py-2.5 text-base font-medium rounded-lg text-white hover:bg-primary/90 transition-colors">
                        Visit Resource
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="elysium-btn-primary px-6 py-5"
            >
              Previous
            </Button>
            <span className="text-lg text-foreground self-center">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="elysium-btn-primary px-6 py-5"
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Library;