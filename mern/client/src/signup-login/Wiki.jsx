import styles from '../styles/Wiki.module.css';
import curve from '../assets/forgettingCurve.png';


function Wiki() {
  return (
    <div className={styles.background}>
      <div className={styles.title}>
        What is the Ebbinghaus Forgetting Curve?
      </div>
      <img className={styles.curve} src={curve} />
      <div className={styles.bodytext}> 
        Created by Psychologist Hermann Ebbinghaus, the Forgetting Curve illustrates how memory retention decreases over time.
        He also found that an effective way to improve memory retention for a particular subject is to allow yourself to forget it first.
        This may seem counterintuitive, but as you practice the studying, forgetting, and recalling loop, you'll find yourself taking progressively
        less time to recall the information!
      </div>
      <div className={styles.title}>
        How do I make the most out of EchoHaus?
      </div>
      <div className={styles.bodytext1}>
        <div className={styles.singulartext}>
          1. Paste your notes and study them
        </div>
        <div className={styles.singulartext}>
          2. Intermission: do something unrelated to the subject for a few hours to a day
        </div>
        <div className={styles.intermission}>
          During the intermission time between study sessions, it's essential to allow your brain to rest and consolidate the information you've just learned. Here are some things you can do:
          <div className={styles.intermission2}>
          Take a break: Engage in a non-mentally taxing activity, such as taking a walk, stretching, or grabbing a snack. This helps reset your brain and prepares it for the next round of learning.

          </div>

          <div className={styles.intermission2}>
          Engage in light physical activity: Physical movement, like a short walk or some light exercises, can help boost memory and focus for the next study session.

          </div>
          <div className={styles.intermission2}>
          Review related material: If you have other topics to study, you can briefly switch to something else. This ensures you're not overloading on one subject and keeps your mind engaged in a variety of ways.

          </div>
          <div className={styles.intermission2}>
          Sleep (if it's a longer break): If the intermission is long enough (like overnight), taking a nap or getting a full night’s sleep can dramatically improve memory consolidation.

          </div>
        </div >
        <div className={styles.singulartext}>
          3. Recall as much as you can from your notes
        </div>
        <div className={styles.singulartext}>
          4. Repeat steps 2-3 for at least 3 times (without looking at your notes), with increasing intervals of intermission
        </div>
        <div className={styles.singulartext}>
          5. Start again from Step 1
        </div>
        <div className={styles.boldtext}>
          A personalized forgetting curve will be generated for each note that you follow this procedure for.
        </div>
      </div>
      <div className={styles.bodytext1}>
        <div className={styles.intermission}>
        <div className={styles.intermission2}>
          Ebbinghaus' research highlights the importance of giving yourself sufficient time to study for optimal memory retention. Here's how to interpret your forgetting curve:
        </div>
        <div className={styles.intermission2}>
          Steep curves: If the curve is steep, it indicates that you're forgetting material quickly. To improve retention, try reducing the time between review sessions, as you may be allowing too much time to pass before revisiting the content.
        </div>
        <div className={styles.intermission2}>
          Flat curves early on: If the curve is flat at the beginning, it suggests that the material is either still fresh in your memory or you're already familiar with it. In this case, consider increasing the time between study sessions to strengthen long-term retention.
        </div>
        </div>
      </div>
    </div>
  )
}

export default Wiki;