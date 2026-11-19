# Project Maldives

This file is the app's data. Edit any table and the app picks it up the next time it opens with a connection.

Rules for editing:
- Keep each section heading (`## Name`) and each table's header row exactly as they are. Add, remove or change rows freely.
- Dates are `YYYY-MM-DD`. Days of the week are `Mon` `Tue` `Wed` `Thu` `Fri` `Sat` `Sun`.
- An empty cell means "use the default". A `-` means "none".
- If something can't be read, the app keeps the last version that worked and shows a yellow note saying what to fix.

## Settings

| key | value |
|---|---|
| start | 2026-11-19 |
| end | 2026-12-26 |
| weigh_in | 2026-12-20 |
| yacht | 2026-12-26 |
| start_weight | 195 |
| lift_time | 5:00 PM |
| lights_out | 10:15 PM |
| steps_target | 9000 |
| sleep_target | 7.5 |
| protein_target | 210 |

## Phases

`sets`: `2` caps every exercise at 2 sets, `full` uses the listed sets, `low` keeps the listed sets (low end of the reps), `peak` adds 1 set to exercises marked `peak`, `taper` cuts sets by a third. `rir` overrides every exercise's RIR when filled in.

| phase | from | to | sets | rir | summary |
|---|---|---|---|---|---|
| Re-entry | 2026-11-19 | 2026-11-22 | 2 | 2–3 | 2 sets per exercise at 2–3 RIR. Find your working weights. |
| Thanksgiving week | 2026-11-23 | 2026-11-29 | low | 2 | Reduced volume: low end of the set counts at 2 RIR. On Thanksgiving, train in the morning or rest. |
| Build | 2026-11-30 | 2026-12-06 | full |  | Full sets. 1–2 RIR on compounds, 0–1 on isolation. |
| Peak | 2026-12-07 | 2026-12-13 | peak |  | +1 set on incline press and lateral raises if sleep is 7 h+ and loads are holding. |
| Taper | 2026-12-14 | 2026-12-20 | taper | 2 | Sets cut by a third, same loads, 2 RIR. One lower session (Tue). No alcohol Dec 13–20. |
| Refill | 2026-12-21 | 2026-12-22 | full | 2–3 | Carbs up to maintenance so you arrive full, not flat. Expect +1–3 lb of glycogen. |
| Travel | 2026-12-23 | 2026-12-25 | full |  | Protein every 3–4 h, water, daylight, local bedtime. |
| Yacht | 2026-12-26 | 2026-12-26 | full |  | Enjoy it. Protein at every meal. No beer. |

## Weekly schedule

`day_type` is one of: `lifting`, `zone2`, `refill`, `thanksgiving`, `weighin`, `travel`, `arrival`, `yacht`. `session` is either a workout from Workouts or a row in Sessions.

| day | session | day_type | lunch | dinner | dinner_note |
|---|---|---|---|---|---|
| Mon | Upper A | lifting | A | D |  |
| Tue | Lower A | lifting | B | C |  |
| Wed | Zone 2 walk | zone2 | A | E | half rice |
| Thu | Push | lifting | G | F |  |
| Fri | Pull + arms | lifting | A | D |  |
| Sat | Lower B | lifting | B | C |  |
| Sun | Zone 2 hike | zone2 | G | A | half rice |

## Rope by phase

Values come from Rope sessions. Add `?` to make it optional. `-` means no rope.

| phase | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|---|
| Re-entry | - | - | - | easy10 | easy10 | easy10? | - |
| Thanksgiving week | intervals6 | easy | easy? | easy | easy | - | - |
| Build | intervals | easy | easy? | intervals | easy | - | - |
| Peak | intervals | easy | easy? | intervals | easy | - | - |
| Taper | easy10 | - | easy10 | - | easy10 | - | - |
| Refill | easy10? | easy10? | - | - | - | - | - |
| Travel | - | - | - | - | - | - | - |
| Yacht | - | - | - | - | - | - | - |

## Rope sessions

| rope | name | duration | how |
|---|---|---|---|
| easy | Rope, easy | 10–15 min | 5 rounds of 2 min easy skipping, 30 s rest, then 2 min hip and ankle mobility. Effort 4–5/10, you can talk. |
| easy10 | Rope, easy | 10 min | 10 minutes of easy skipping at 4–5/10, then a minute of ankle mobility. |
| intervals | Rope intervals | 15–20 min | 3 min easy, then 10 rounds of 30 s hard (7–8/10) and 30 s easy, then 3 min easy. |
| intervals6 | Rope intervals | 12–15 min | 3 min easy, then 6 rounds of 30 s hard (7–8/10) and 30 s easy, then 3 min easy. |

## Day overrides

Any filled cell replaces the weekly default for that date.

| date | session | day_type | lunch | dinner | dinner_note | rope | sets | rir | note |
|---|---|---|---|---|---|---|---|---|---|
| 2026-11-26 |  | thanksgiving |  | T |  |  |  |  | Thanksgiving. Train in the morning or rest. Use it as your carb-refill rehearsal and note how you look Friday morning. |
| 2026-12-16 |  |  |  |  |  |  |  |  | 40-min incline walk today. |
| 2026-12-17 |  |  |  |  |  |  | 2 | 2 | 2 sets per exercise at 2 RIR. Keep the loads. |
| 2026-12-18 |  |  |  |  |  |  | 2 | 2 | 2 sets per exercise at 2 RIR. |
| 2026-12-19 | Walk + easy bag | zone2 |  |  |  | - |  |  | No legs. Only familiar foods from here on. |
| 2026-12-20 | Weigh-in + easy hike | weighin |  |  |  |  |  |  | Weigh in after the bathroom, before food. Log weight and waist, take photos. |
| 2026-12-21 | Rest + walk | refill |  |  |  |  |  |  | Refill day 1. Rice, potatoes, pasta, fruit. |
| 2026-12-22 | Pump session | refill |  |  |  |  |  |  | Refill day 2. Pack travel food and compression socks. |
| 2026-12-23 | Travel day | travel | - | - |  | - |  |  | Fly today. |
| 2026-12-24 | Arrival | arrival | - | - |  | - |  |  | Daylight, ~10,000 steps, familiar meals, local bedtime. |
| 2026-12-25 | Arrival | arrival | - | - |  | - |  |  | Daylight, ~10,000 steps, familiar meals, local bedtime. |
| 2026-12-26 | Yacht | yacht | - | - |  | - |  |  | Boarding day. |

## Sessions

Non-lifting sessions. Lifting sessions live under Workouts.

| session | time | title | details |
|---|---|---|---|
| Zone 2 walk | 5:00 PM | Zone 2: 35–45 min incline walk + 10 min mobility | Conversational pace. Prep day: cook chicken for Thu–Sat and prep fresh vegetables. |
| Zone 2 hike | 9:00 AM | Zone 2 hike, 60–90 min, then meal prep | Electrolytes in your water. After: cook chicken for 5 meals, rice, roasted potatoes and slaw. |
| Walk + easy bag | 5:00 PM | 45-min walk + 10 min easy bag work | No legs today. |
| Weigh-in + easy hike | 9:00 AM | Easy hike, 60 min | After the weigh-in. |
| Rest + walk | 5:00 PM | Rest day, 30–45 min walk | Nothing hard. |
| Travel day | - | Travel | See the checklist. |
| Arrival | 8:00 AM | Daylight walk | Get morning light to shift your clock 13 hours. |
| Yacht | 8:00 AM | Band pump (optional), 10 min | 3 rounds: push-ups × 15, band laterals × 20, band curls × 15, band pushdowns × 15. |

## Day types

| type | label | calories | protein | carbs | fat | snack | note |
|---|---|---|---|---|---|---|---|
| lifting | Lifting day | 2,050–2,100 | 210–225 | ~190 | ~50 | Banana, 1 oz pumpkin seeds, 2 rice cakes + 1 tbsp honey |  |
| zone2 | Zone 2 day | ~1,850 | 210–225 | ~130 | ~50 | Banana + 1 oz pumpkin seeds | Skip the rice cakes and honey, halve the starch at dinner. |
| thanksgiving | Thanksgiving | ~2,800 | 200+ | flexible | flexible | Banana + 1 oz pumpkin seeds | Planned maintenance day. Back to normal Friday, no fasting or compensating. |
| weighin | Weigh-in day | ~1,850 until dinner | 210–225 | ~130 + dinner carbs | ~50 | Banana + 1 oz pumpkin seeds | Normal Zone 2 day until dinner. From dinner, add carbs. |
| refill | Refill day | ~2,700 | 210–225 | ~340 | ~50 | Banana, 1 oz pumpkin seeds, 2 rice cakes + 1 tbsp honey | A lifting day plus ~150 g carbs. Familiar foods only. Sodium and water normal. |
| travel | Travel day | - | every 3–4 h | - | - | - | Airline meals are salty: drink water with them. |
| arrival | Arrival | - | every meal | - | - | - | Familiar meals, steady sodium. |
| yacht | Yacht | - | every meal | - | - | - | No beer. |

## Checklist

Items show in this order. `part` groups them on screen. `when` decides which days an item shows (all words must match; day kinds and day types are "any of"):
- day kinds: `home` (Nov 19 – Dec 22), `travel`, `arrival`, `yacht`, or `all`
- day types: `lifting`, `zone2`, `refill`, `thanksgiving`, `weighin`
- `rope` (only on rope days), `lunch` / `dinner` / `snack` (only when today has one), `mon`…`sun`, `from:YYYY-MM-DD`, `until:YYYY-MM-DD`

If two rows share an `id`, the first one that matches wins. `detail` can be `meal:breakfast`, `meal:lunch`, `meal:dinner`, `supps:<when>`, `rope`, `session` or `nicotine`. Placeholders in `{braces}` fill in from today's plan.

| part | time | id | item | when | detail | notes | optional |
|---|---|---|---|---|---|---|---|
| Morning | 6:15 AM | wake | Wake: water + electrolytes, caffeine | home | supps:wake | Fixed wake time every day. |  |
| Morning | 6:45 AM | rope | {rope_name}, {rope_duration} + 5 min outdoor light | home rope | rope | Jump on wood or rubber, hops 1–2 in. Sore calves or Achilles the next morning? Swap for a 15-min brisk walk. |  |
| Morning | 7:15 AM | breakfast | Breakfast shake + AM supplements | home | meal:breakfast supps:breakfast |  |  |
| Morning | 7:20 AM | numbers | Morning numbers: weight, sleep, hunger, bloating | home | | Weigh after the bathroom, before food. Fills in from Today's numbers. |  |
| Morning | AM | review | Sunday review: waist, photos, top sets, backup | home sun |  | Waist at the navel, relaxed after a normal breath out. Photos front, side, back, same light. Then tap Back up. |  |
| Morning | AM | socks | Compression socks on for the whole flight | travel |  | Below-knee, graduated. |  |
| Morning | Board | watch | Set your watch to Maldives time (+13 h) | travel |  | Sleep on the Maldives night from here. |  |
| Morning | 8:00 AM | daylight | Morning daylight walk | arrival |  | Morning light shifts your body clock. |  |
| Day | Work | move | 5-min walk every 60–90 min | home |  |  |  |
| Day | 12:30 PM | lunch | Lunch: {lunch}, then 10-min walk | home lunch | meal:lunch |  |  |
| Day | 3:30 PM | snack | Pre-workout snack | home snack | supps:preworkout | {snack}. No caffeine. |  |
| Day | Flight | aisle | Walk the aisle every 1–2 h, ankle pumps every 30 min | travel |  |  |  |
| Day | Flight | flwater | ~250 ml water per waking hour, no alcohol | travel |  |  |  |
| Day | Flight | flprotein | Protein every 3–4 h from packed food | travel |  | Whey or Isopure packets, jerky, tuna or chicken pouches, rice cakes. |  |
| Day | Meals | familiar | Familiar meals, protein at every meal | arrival yacht |  | Keep sodium steady. |  |
| Training | {session_time} | session | {session_title} | home arrival yacht | session |  |  |
| Evening | 7:00 PM | dinner | Dinner: {dinner} + romaine salad, then 10-min walk | home dinner | meal:dinner |  |  |
| Evening | 7:00 PM | psyllium | Psyllium 5 g with dinner | home from:2026-11-22 | supps:dinner |  |  |
| Evening | 7:15 PM | nicotine | Nicotine rule | home travel arrival | nicotine |  |  |
| Evening | 9:00 PM | screens | Screens down, lights dimmed | home |  | Dinner finished 2.5–3 h before bed. |  |
| Evening | 9:30 PM | isopure | Isopure + evening supplements | home | supps:bed |  |  |
| Evening | 10:15 PM | lights | Lights out: 7.5–8.5 h in bed | home |  | Sleep matters more than any supplement. |  |
| Evening | Bed | melatonin | Melatonin 0.5–5 mg at local bedtime | travel arrival |  | 2–5 nights. More than 5 mg works no better. |  |
| All day | Day | steps | Steps 9,000–11,000 | home arrival |  | Fills in from Today's numbers. |  |
| All day | Day | water | Water 3–4 L | all |  | Mostly before 7 pm, plus 500–750 ml per training hour. |  |
| All day | Day | alcohol | No alcohol: reset week | home until:2026-11-25 |  |  |  |
| All day | Day | alcohol | No alcohol: final week before weigh-in | home from:2026-12-13 until:2026-12-20 |  |  |  |
| All day | Day | alcohol | No alcohol: training night | lifting |  | Drinking after training cut muscle protein synthesis 24–37%. |  |
| All day | Day | alcohol | Alcohol: one weekend night max, 2 clear spirits, never beer | home yacht |  |  |  |
| All day | Day | reset | Reset habits: no carbonation, gum or sugar alcohols; cooked veg | home until:2026-11-25 |  | Same sodium every day, not low. |  |

## Supplements

| when | supplement | dose | notes |
|---|---|---|---|
| wake | Caffeine | ~265 mg | 30–45 min before rope. None after 1 pm. |
| wake | Collagen + vitamin C (optional) | 15 g + ~50 mg | 30–60 min before rope. |
| breakfast | Whey isolate | 50 g, in the shake |  |
| breakfast | Creatine monohydrate | 5 g, in the shake |  |
| breakfast | Psyllium husk | 5 g | In a separate full glass of water. |
| breakfast | Omega-3 (Carlson Elite) | 2 softgels |  |
| breakfast | Vitamin D3/K2 | 1,000–2,000 IU |  |
| preworkout | Citrulline malate (optional) | 6–8 g | 45–60 min before lifting. |
| preworkout | Electrolytes (optional) | 500–1,000 mg sodium | Heavy-sweat days. |
| dinner | Psyllium husk | 5 g | With a full glass of water. |
| bed | Isopure | 1.5 scoops | 160 kcal, 37 g protein. |
| bed | Magnesium glycinate (optional) | ≤350 mg elemental | Check the label: "400 mg" may be the compound weight. |
| bed | Glycine (optional) | 3 g | 30–60 min before bed. |

## Nicotine

| from | to | rule |
|---|---|---|
| 2026-11-19 | 2026-12-06 | No vaping in the 3 h before bed or in the bedroom. Drop one nicotine strength. |
| 2026-12-07 | 2026-12-19 | Drop another strength, or halve daily use. Nothing in the 3 h before bed. |
| 2026-12-20 | 2026-12-22 | Lowest strength only. Decide whether you'll use nicotine replacement for the trip. |
| 2026-12-23 | 2026-12-26 | Vapes are banned in the Maldives, tourists included. Leave the vape at home. |

## Meals

Weights are raw for meat and fish, cooked for rice.

| id | name | ingredients | kcal | protein | carbs | fat |
|---|---|---|---|---|---|---|
| breakfast | Breakfast shake | Shake with 50 g whey and 5 g creatine, Oikos Pro (7 oz), ½ grapefruit, string cheese, psyllium 5 g | 500 | 80 |  |  |
| A | Default bowl | 200 g chicken breast (air fryer), 140 g brown rice, 150 g broccoli, 1 tsp olive oil | 500 | 53 | 46 | 11 |
| B | Chicken burrito bowl | 180 g chicken breast with fajita spice, 100 g rice, 80 g black beans, pico, lettuce, 40 g avocado, lime | 530 | 51 | 52 | 12 |
| C | Salmon and potatoes | 170 g wild salmon, 250 g roasted Yukon potatoes, 150 g asparagus, 1 tsp olive oil | 490 | 46 | 50 | 13 |
| D | Steak tacos | 170 g trimmed top sirloin, 4 corn tortillas, cabbage-lime slaw, salsa | 490 | 43 | 54 | 12 |
| E | Shrimp stir-fry | 250 g shrimp, 200 g peppers, snap peas and bok choy, 150 g jasmine rice, low-sodium soy, ginger, garlic, 2 tsp avocado oil | 560 | 57 | 56 | 10 |
| F | Lean beef pasta | 150 g 95% lean ground beef, 70 g dry pasta, 125 g marinara, side salad | 535 | 43 | 62 | 11 |
| G | Greek chicken plate | 180 g chicken breast with lemon and oregano, 1 whole-wheat pita, cucumber-tomato salad, 75 g tzatziki made with 0% Greek yogurt, 1 tsp olive oil | 500 | 53 | 44 | 11 |
| T | Thanksgiving plate | Half the plate turkey breast (8–10 oz), your two favorite sides, one dessert portion. Walk 20–30 min after. |  | 60 |  |  |

## Workouts

Each `###` heading is a session name used in the schedule. `peak` = yes gets +1 set in the Peak phase. `demo` is what the How-to link searches for (blank uses the exercise name). `key` = yes marks the lifts the progress rules watch.

### Upper A

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Incline dumbbell press | 3 | 6–10 | 1–2 | 2–3 min | yes | yes |  |
| Chest-supported row | 3 | 8–12 | 1–2 | 2 min |  |  |  |
| Machine chest press or weighted dip | 2 | 8–12 | 1 | 2 min |  |  | machine chest press |
| Neutral-grip lat pulldown | 3 | 10–12 | 1 | 90 s |  |  |  |
| Cable lateral raise | 3 | 12–20 | 0–1 | 60 s | yes |  |  |
| Cable curl + overhead cable triceps extension (superset) | 2 | 10–15 each | 0–1 | 60 s |  |  | overhead cable triceps extension |

### Lower A

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Hack squat (or back squat) | 3 | 6–10 | 2 | 2–3 min |  | yes | hack squat |
| Romanian deadlift | 3 | 8–10 | 2 | 2 min |  |  |  |
| Leg extension | 2 | 12–15 | 0–1 | 90 s |  |  |  |
| Seated leg curl | 2 | 10–15 | 0–1 | 90 s |  |  |  |
| Standing calf raise | 2 | 10–15 | 1 | 60 s |  |  |  |
| Cable lateral raise | 2 | 15–20 | 0–1 | 60 s | yes |  |  |
| Cable crunch | 3 | 10–15 | 1 | 60 s |  |  |  |

### Push

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Seated dumbbell or machine shoulder press | 3 | 6–10 | 1–2 | 2–3 min |  | yes | seated dumbbell shoulder press |
| Low-incline Smith press (15–30°) | 3 | 8–10 | 1–2 | 2 min | yes |  | low incline smith machine press |
| Single-arm cable lateral raise | 3 | 12–15 per side | 0–1 | 60 s | yes |  |  |
| Pec deck or cable fly | 2 | 12–15 | 0–1 | 60–90 s |  |  | pec deck fly |
| Rope triceps pushdown | 3 | 10–15 | 0–1 | 60 s |  |  |  |
| Dumbbell lateral raise drop set (finisher) | 1 | heavy, lighter, lighter | 0 | - |  |  | dumbbell lateral raise drop set |

### Pull + arms

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Pull-up (weighted or assisted) | 3 | 6–10 | 1–2 | 2–3 min |  | yes | pull up |
| Single-arm cable or dumbbell row | 3 | 8–12 per side | 1 | 90 s |  |  | single arm dumbbell row |
| Reverse pec deck | 3 | 12–20 | 0–1 | 60 s |  |  |  |
| Incline dumbbell curl | 3 | 8–12 | 0–1 | 60–90 s |  |  |  |
| Hammer curl + cross-body cable triceps extension (superset) | 2 | 10–15 each | 0–1 | 60 s |  |  | cross body cable triceps extension |
| Face pull | 2 | 15–20 | 1 | 60 s |  |  |  |

### Lower B

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Trap-bar deadlift (or hip thrust) | 3 | 5–8 | 2 | 3 min |  |  | trap bar deadlift |
| Bulgarian split squat | 2 | 8–12 per leg | 1–2 | 90 s |  |  |  |
| Lying leg curl | 3 | 10–12 | 0–1 | 90 s |  |  |  |
| Leg press | 2 | 12–15 | 1 | 2 min |  |  |  |
| Seated calf raise | 2 | 12–20 | 0–1 | 60 s |  |  |  |
| Cable lateral raise | 2 | 15–20 | 0–1 | 60 s | yes |  |  |
| Hanging knee raise | 3 | 10–15 | 1 | 60 s |  |  |  |
| Heavy-bag finisher (2-min rounds, 1 min rest) | 5 | rounds at 7/10 | - | - |  |  | heavy bag workout rounds |

### Pump session

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Push-up or machine chest press | 3 | 15 | 2–3 | 45–60 s |  |  | push up |
| Cable or band lateral raise | 3 | 20 | 2–3 | 45–60 s |  |  | band lateral raise |
| Cable row | 2 | 15 | 2–3 | 45–60 s |  |  | seated cable row |
| Curl | 2 | 15 | 2–3 | 45–60 s |  |  | dumbbell curl |
| Triceps pushdown | 2 | 15 | 2–3 | 45–60 s |  |  |  |

## Warm-up

Before every lift: wraps and 14–16 oz gloves. 2 min of shadowboxing, then 3 bag rounds of 2 min at 60–70% effort with 30 s rest, focusing on technique. Finish with 2 lighter ramp-up sets of your first lift.

Progression: when every set reaches the top of the rep range at the target RIR, add 2.5–5 lb on upper lifts or 5–10 lb on lower lifts. In a deficit, holding your loads counts as a win.

## Milestones

7-day average weight, assuming 195 lb on Nov 19. The app shifts these by the difference between your first weigh-in and `start_weight`.

| date | low | high | waist |
|---|---|---|---|
| 2026-11-29 | 190 | 192 | −0.5 to −1 in |
| 2026-12-06 | 188 | 190 | −1 to −1.5 in |
| 2026-12-13 | 186 | 188 | −1.5 to −2 in |
| 2026-12-20 | 183 | 186 | −1.5 to −2.5 in |

## Adjustment rules

The app checks these every Sunday, in this order, and shows the first one that applies. Edit the wording or the numbers in `threshold`. Change at most one thing a week, and nothing during Thanksgiving week.

| id | threshold | when | action |
|---|---|---|---|
| sleep | 6.5 | Under 6.5 h of sleep for 3 nights | Cut 1 set per exercise and swap rope intervals for easy rope until sleep recovers. |
| lifts | 10 | Two or more key lifts down more than 10% for 2 sessions in a row | Add 150–250 kcal of carbs before training, cut 1 set per exercise for a week, and check sleep. |
| too_fast | 1.5 | Losing more than 1.5% a week for 2 weeks, after week 1 | Add 150–250 kcal of carbs before training. |
| hunger | 8 | Hunger at 8/10 or higher for 3 or more days | Add 100–150 kcal from protein or high-volume foods. Move carbs to the hardest time of day. Check sleep. |
| on_track | 0.7–1.2 | Losing 0.7–1.2% a week | Change nothing. |
| stall_waist_down | 0.5 | Under 0.5% a week for 10–14 days with 90%+ adherence, waist down 0.25 in or more | Change nothing. You're losing fat and holding water. |
| stall_low_adherence | 90 | Under 0.5% a week, but adherence under 90% | Change nothing in the plan. Hit calories and protein on 90%+ of days first. |
| stall | 0.5 | Under 0.5% a week for 10–14 days and the waist hasn't moved | First rule out a salty week, alcohol, poor sleep or a new supplement. If none applies: cut 150 kcal (from fat, or carbs on Zone 2 days) OR add 2,000 steps a day. One, not both. If it stalls again, add 10–15 min of StairMaster after Upper A and Push. |
| slow_week | 0.7 | Under 0.7% this week, not yet a 10-day stall | Change nothing. Most flat weeks are water. |

## Stop and get seen

Chest pressure, unusual breathlessness, fainting or palpitations. Any rectal bleeding, black stool or dizziness.

## Eating out

| where | order | skip |
|---|---|---|
| Steakhouse | 6–8 oz filet or sirloin, plain baked potato or rice, double vegetables | Butter, creamed sides, bread |
| Mexican | Chicken or shrimp fajitas or a bowl, corn tortillas, salsa | Chips, cheese, sour cream |
| Sushi | Sashimi, 1 simple roll, edamame, miso | Tempura, mayo rolls |
| Mediterranean | Chicken or fish plate, rice or pita, salad, sauces on the side | Fried items |
| Drinks (one weekend night) | Clear spirit with soda and lime, 2 at most, water in between | Beer, always |

## Groceries

- Protein: chicken breast 1.5 kg, wild salmon 340 g, top sirloin 340 g, shrimp 250 g, 95% lean ground beef 1 lb (freeze half), Oikos Pro ×7, string cheese ×7, 0% Greek yogurt, whey isolate, Isopure
- Carbs: brown rice pouches, jasmine rice, Yukon potatoes 1 kg, corn tortillas, 2 whole-wheat pitas, pasta, 1 can black beans, rice cakes, honey, bananas ×7, grapefruit ×4
- Produce: broccoli 1 kg, asparagus ×2, romaine ×3, ½ cabbage, bell peppers ×3, snap peas, bok choy, cucumbers ×2, tomatoes, onion, garlic, ginger, limes ×4, lemons ×2, cilantro, avocados ×2, zucchini or green beans, berries
- Pantry: olive oil, avocado oil, low-sodium soy sauce, marinara, salsa, pico, fajita seasoning, oregano, pumpkin seeds, psyllium, electrolyte packets
- Prep: Sunday, chicken for 5 meals, rice, roasted potatoes, slaw. Wednesday, chicken for Thu–Sat and fresh vegetables. Cook salmon, steak and shrimp the day you eat them.
