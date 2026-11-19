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
| weight_min | 150 |
| weight_max | 230 |
| weight_jump | 3 |
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

`day_type` is one of: `lifting`, `zone2`, `refill`, `thanksgiving`, `weighin`, `travel`, `arrival`, `yacht`. `session` is either a workout from Workouts or a row in Sessions. A `dinner_note` containing "half" halves the grains in that dinner.

| day | session | day_type | lunch | dinner | dinner_note |
|---|---|---|---|---|---|
| Mon | Upper A | lifting | A | D |  |
| Tue | Lower A | lifting | B | C |  |
| Wed | Zone 2 walk | zone2 | A | E | half rice |
| Thu | Push | lifting | G | F |  |
| Fri | Pull + arms | lifting | A | D |  |
| Sat | Lower B | lifting | B | C |  |
| Sun | Zone 2 hike | zone2 | G | A | half rice |

## Rope schedule

Values are sessions from Timer sessions. Add `(optional)` to make one optional. `-` means no rope. Saturday and Sunday mornings have no rope.

| from | to | mon | tue | wed | thu | fri |
|---|---|---|---|---|---|---|
| 2026-11-19 | 2026-11-22 | - | - | - | easy10 | easy10 |
| 2026-11-23 | 2026-11-29 | intro | easy10 | - | easy10 | easy10 |
| 2026-11-30 | 2026-12-13 | intervals | easy15 | easy15 (optional) | intervals | easy15 |
| 2026-12-14 | 2026-12-20 | easy10 | easy10 | - | easy10 | - |
| 2026-12-21 | 2026-12-22 | easy10 (optional) | easy10 (optional) | - | - | - |

## Gym timers

Timed sessions that run before and after each workout.

| session | before | after |
|---|---|---|
| Upper A | bag_warmup | - |
| Lower A | bag_warmup | - |
| Push | bag_warmup | - |
| Pull + arms | bag_warmup | - |
| Lower B | bag_warmup | bag_finisher |
| Pump session | bag_warmup | - |

## Timer info

| session | name | notes |
|---|---|---|
| easy10 | Rope, easy | Effort 4–5/10, you can talk. Jump on wood or rubber, hops 1–2 in. Sore calves or Achilles the next morning? Swap for a 15-min brisk walk. |
| easy15 | Rope, easy | Effort 4–5/10, you can talk. Jump on wood or rubber, hops 1–2 in. Sore calves or Achilles the next morning? Swap for a 15-min brisk walk. |
| intervals | Rope intervals | Hard rounds at 7–8/10. Tripped? Keep the clock running. |
| intro | Rope intervals, intro | First interval day: 6 short hard rounds. Stay controlled. |
| bag_warmup | Heavy-bag warm-up | Wraps and 14–16 oz gloves. On upper-body days (Mon, Thu, Fri), keep punches at about 60% power to save the shoulders for pressing. |
| bag_finisher | Heavy-bag finisher | Stop if you feel chest pressure or unusual breathlessness. |

## Timer sessions

Each row is one segment. `rounds` repeats the work/rest pair. Rest 0 means go straight to the next segment.

| session | seg | label | work_s | rest_s | rounds | cue |
|---|---|---|---|---|---|---|
| easy10 | 1 | No-rope warm-up | 60 | 0 | 1 | Ankle bounces, arm circles, wrist rolls |
| easy10 | 2 | Two-foot bounce | 60 | 30 | 2 | Effort 4–5/10. You can talk. |
| easy10 | 3 | Boxer skip | 60 | 30 | 2 | Shift your weight foot to foot |
| easy10 | 4 | Alternate-foot jog step | 60 | 30 | 2 | Light, quiet landings, 1–2 in off the floor |
| easy15 | 1 | No-rope warm-up | 60 | 0 | 1 | Ankle bounces, arm circles, wrist rolls |
| easy15 | 2 | Two-foot bounce | 120 | 30 | 1 | Effort 4–5/10 |
| easy15 | 3 | Boxer skip | 120 | 30 | 2 | Shift your weight foot to foot |
| easy15 | 4 | Side-to-side hops | 120 | 30 | 2 | Small hops, stay relaxed |
| easy15 | 5 | Calf and ankle mobility | 90 | 0 | 1 | Calf stretch, ankle circles |
| intervals | 1 | Warm-up: easy bounce | 75 | 15 | 2 | Effort 4/10 |
| intervals | 2 | HARD: fast bounce or high knees | 30 | 30 | 10 | Hard 7–8/10. Easy bounce or rest during the 30 s. Tripped? Keep the clock running. |
| intervals | 3 | Cool-down: easy skip | 120 | 0 | 1 | Effort 3/10 |
| intervals | 4 | Calf stretch | 60 | 0 | 1 |  |
| intro | 1 | Warm-up: easy bounce | 75 | 15 | 2 | Effort 4/10 |
| intro | 2 | HARD: fast bounce | 20 | 40 | 6 | 7/10. First interval day, so stay controlled. |
| intro | 3 | Cool-down: easy skip | 120 | 0 | 1 |  |
| intro | 4 | Calf stretch | 60 | 0 | 1 |  |
| bag_warmup | 1 | Shadowbox | 120 | 0 | 1 | Footwork in and out, jab, jab-cross, slips. 3/10. |
| bag_warmup | 2 | Round 1: jab work | 120 | 30 | 1 | Jab, double jab, jab-cross. Move after every combo. 5/10. |
| bag_warmup | 3 | Round 2: combos | 120 | 30 | 1 | 1-2-3 and 1-1-2. Reset your stance between combos. 6/10. |
| bag_warmup | 4 | Round 3: head and body | 120 | 0 | 1 | 1-2 to the head, then a body hook. Fast straight punches for the last 20 s. 6–7/10. |
| bag_warmup | 5 | Shake out | 60 | 0 | 1 | Arm swings, then 2 light ramp-up sets of your first lift |
| bag_finisher | 1 | Jab-cross volume | 120 | 60 | 1 | Steady rhythm. 6/10. |
| bag_finisher | 2 | Power 1-2-3 | 120 | 60 | 1 | Throw, reset your feet, repeat. 7/10. |
| bag_finisher | 3 | Body work | 120 | 60 | 1 | Hooks and uppercuts to the body, then step out. 7/10. |
| bag_finisher | 4 | Movement | 120 | 60 | 1 | 2 punches, pivot off, circle the bag. 7/10. |
| bag_finisher | 5 | Bursts: fast straights | 20 | 10 | 4 | All-out straight punches, 8/10 |
| bag_finisher | 6 | Easy finish | 40 | 0 | 1 | Light punches, breathe |

## Day overrides

Any filled cell replaces the weekly default for that date. `time` sets when the workout starts.

| date | session | time | day_type | lunch | dinner | dinner_note | rope | sets | rir | note |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-26 | Push | 9:00 AM | thanksgiving |  | T |  |  |  |  | Thanksgiving. Push at 9:00 AM, or rest. Use dinner as your carb-refill rehearsal and note how you look Friday morning. |
| 2026-12-16 |  |  |  |  |  |  |  |  |  | 40-min incline walk today. |
| 2026-12-17 |  |  |  |  |  |  |  | 2 | 2 | 2 sets per exercise at 2 RIR. Keep the loads. |
| 2026-12-18 |  |  |  |  |  |  |  | 2 | 2 | 2 sets per exercise at 2 RIR. |
| 2026-12-19 | Walk + easy bag |  | zone2 |  |  |  | - |  |  | No legs, no bag finisher. Only familiar foods from here on. |
| 2026-12-20 | Weigh-in + easy hike |  | weighin |  |  |  |  |  |  | Weigh in after the bathroom, before food. Log weight and waist, take photos. |
| 2026-12-21 | Rest + walk |  | refill |  |  |  |  |  |  | Refill day 1: about +150 g carbs. Rice, potatoes, fruit. |
| 2026-12-22 | Pump session |  | refill |  |  |  |  |  |  | Refill day 2: about +150 g carbs. Pack travel food and compression socks. |
| 2026-12-23 | Travel day |  | travel | - | - |  | - |  |  | Fly today. |
| 2026-12-24 | - |  | arrival | - | - |  | - |  |  | Daylight, ~10,000 steps, familiar meals, local bedtime. |
| 2026-12-25 | - |  | arrival | - | - |  | - |  |  | Daylight, ~10,000 steps, familiar meals, local bedtime. |
| 2026-12-26 | Yacht |  | yacht | - | - |  | - |  |  | Boarding day. |

## Sessions

Non-lifting sessions. Lifting sessions live under Workouts.

| session | time | title | details |
|---|---|---|---|
| Zone 2 walk | 5:00 PM | Zone 2: 35–45 min incline walk + 10 min mobility | Conversational pace. Wednesday meal prep is tonight. |
| Zone 2 hike | 9:00 AM | Zone 2 hike, 60–90 min | Electrolytes in your water. Sunday meal prep after. |
| Walk + easy bag | 5:00 PM | 45-min walk + 10 min easy bag work | No legs today. |
| Weigh-in + easy hike | 9:00 AM | Easy hike, 60 min | After the weigh-in. |
| Rest + walk | 5:00 PM | Rest day, 30–45 min walk | Nothing hard. |
| Travel day | - | Travel | See the checklist. |
| Yacht | 8:00 AM | Band pump (optional), 10 min | 3 rounds: push-ups × 15, band laterals × 20, band curls × 15, band pushdowns × 15. |

## Day types

| type | label | calories | protein | carbs | fat | snack | note |
|---|---|---|---|---|---|---|---|
| lifting | Lifting day | 2,050–2,100 | 210–225 | ~190 | ~50 | Banana, 1 oz pumpkin seeds, 2 rice cakes + 1 tbsp honey |  |
| zone2 | Zone 2 day | ~1,850 | 210–225 | ~130 | ~50 | Banana + 1 oz pumpkin seeds | Skip the rice cakes and honey, halve the starch at dinner. |
| thanksgiving | Thanksgiving | ~2,800 | 200+ | flexible | flexible | Banana + 1 oz pumpkin seeds | Planned maintenance day. Back to normal Friday, no fasting or compensating. |
| weighin | Weigh-in day | ~1,850 until dinner | 210–225 | ~130 + dinner carbs | ~50 | Banana + 1 oz pumpkin seeds | Normal Zone 2 day until dinner. From dinner, add carbs. |
| refill | Refill day | ~2,700 | 210–225 | ~340 | ~50 | Banana, 1 oz pumpkin seeds, 2 rice cakes + 1 tbsp honey | A lifting day plus ~150 g carbs (see Refill extras). Familiar foods only. Sodium and water normal. |
| travel | Travel day | - | every 3–4 h | - | - | - | Airline meals are salty: drink water with them. |
| arrival | Arrival | - | every meal | - | - | - | Familiar meals, steady sodium. |
| yacht | Yacht | - | every meal | - | - | - | No beer. |

## Checklist

Items show in this order. `part` groups them on screen (`auto` picks Morning, Day or Evening from the time; a Training item before noon moves to Morning). `when` decides which days an item shows (all words must match; day kinds and day types are "any of"):
- day kinds: `home` (Nov 19 – Dec 22), `travel`, `arrival`, `yacht`, or `all`
- day types: `lifting`, `zone2`, `refill`, `thanksgiving`, `weighin`
- `rope`, `gym` (workout with a warm-up timer), `finisher`, `lunch`, `dinner`, `snack`, `prep` (meal-prep day), `brine` (prep tomorrow), `shop` (groceries for next week), `mon`…`sun`, `from:YYYY-MM-DD`, `until:YYYY-MM-DD`

If two rows share an `id`, the first one that matches wins. `detail` can be `meal:breakfast`, `meal:lunch`, `meal:dinner`, `supps:<when>`, `timer:rope`, `timer:before`, `timer:after`, `session`, `nicotine`, `link:groceries` or `link:prep`. Placeholders in `{braces}` fill in from today's plan.

| part | time | id | item | when | detail | notes | optional |
|---|---|---|---|---|---|---|---|
| Morning | 6:15 AM | wake | Wake: water + electrolytes, caffeine | home | supps:wake | Fixed wake time every day. |  |
| Morning | AM | vape | Leave the vape at home: vapes are banned in the Maldives | travel from:2026-12-23 until:2026-12-23 |  | Customs can hold devices until you leave. |  |
| Morning | 6:45 AM | rope | {rope_name}, {rope_minutes} min + 5 min outdoor light | home rope | timer:rope | Tap to open the timer. |  |
| Morning | 7:15 AM | breakfast | Breakfast shake + AM supplements | home | meal:breakfast supps:breakfast |  |  |
| Morning | 7:20 AM | numbers | Morning numbers: weight, sleep, hunger, bloating | home |  | Weigh after the bathroom, before food. Fills in from Today's numbers. |  |
| Morning | AM | review | Sunday review: waist, photos, top sets, backup | home sun |  | Waist at the navel, relaxed after a normal breath out. Photos front, side, back, same light. Then tap Back up. |  |
| Morning | 9:00 AM | groceries | Grocery shop | home sat shop | link:groceries | List for the week of {next_week}. |  |
| Morning | AM | socks | Compression socks on for the whole flight | travel |  | Below-knee, graduated. |  |
| Morning | Board | watch | Set your watch to Maldives time (+13 h) | travel |  | Sleep on the Maldives night from here. |  |
| Morning | 8:00 AM | daylight | Morning daylight walk | arrival |  | Morning light shifts your body clock. |  |
| Day | Work | move | 5-min walk every 60–90 min | home |  |  |  |
| auto | {prep_time} | prep | Meal prep, about {prep_minutes} min | home prep | link:prep | Covers {prep_covers}. |  |
| Day | 12:30 PM | lunch | Lunch: {lunch}, then 10-min walk | home lunch | meal:lunch |  |  |
| Day | 3:30 PM | snack | Pre-workout snack | home snack | supps:preworkout | {snack}. No caffeine. |  |
| Day | Flight | aisle | Walk the aisle every 1–2 h, ankle pumps every 30 min | travel |  |  |  |
| Day | Flight | flwater | ~250 ml water per waking hour, no alcohol | travel |  |  |  |
| Day | Flight | flprotein | Protein every 3–4 h from packed food | travel |  | Whey or Isopure packets, jerky, tuna or chicken pouches, rice cakes. |  |
| Day | Meals | familiar | Familiar meals, protein at every meal | arrival yacht |  | Keep sodium steady. |  |
| Training | {warmup_time} | warmup | {warmup_name}, {warmup_minutes} min | home gym | timer:before | Tap to open the timer. |  |
| Training | {session_time} | session | {session_title} | home yacht | session |  |  |
| Training | End | finisher | {finisher_name}, {finisher_minutes} min | home finisher | timer:after | Tap to open the timer. |  |
| Evening | 7:00 PM | dinner | Dinner: {dinner} + romaine salad, then 10-min walk | home dinner | meal:dinner |  |  |
| Evening | 7:00 PM | psyllium | Psyllium 5 g with dinner | home from:2026-11-22 | supps:dinner |  |  |
| Evening | 7:15 PM | nicotine | Nicotine rule | home | nicotine |  |  |
| Evening | 8:00 PM | brine | Dry-brine {brine_g} g chicken for tomorrow | home brine |  | About {brine_salt} kosher salt (¾ tsp per 500 g), uncovered in the fridge. Prep is tomorrow. |  |
| Evening | 9:00 PM | screens | Screens down, lights dimmed | home |  | Dinner finished 2.5–3 h before bed. |  |
| Evening | 9:30 PM | isopure | Isopure + evening supplements | home | supps:bed |  |  |
| Evening | 10:15 PM | lights | Lights out: 7.5–8.5 h in bed | home |  | Sleep matters more than any supplement. |  |
| Evening | Bed | melatonin | Melatonin 0.5–5 mg at local bedtime | travel arrival |  | 2–5 nights. More than 5 mg works no better. |  |
| All day | Day | steps | Steps 9,000–11,000 | home arrival |  | Fills in from Today's numbers. |  |
| All day | Day | water | Water 3–4 L | all |  | Mostly before 7 pm, plus 500–750 ml per training hour. |  |
| All day | Day | alcohol | No alcohol: reset week | home until:2026-11-25 |  |  |  |
| All day | Day | alcohol | No alcohol: final week before weigh-in | home from:2026-12-13 until:2026-12-20 |  |  |  |
| All day | Day | alcohol | No alcohol: training night | lifting |  | Drinking after training cut muscle protein synthesis 24–37%. |  |
| All day | Day | alcohol | Alcohol: one weekend night max, 2 clear spirits, never beer | home |  |  |  |
| All day | Day | alcohol | No beer | yacht |  |  |  |
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

## Meals

`cook`: `prep` means it comes from the Sunday or Wednesday prep; a time means it's cooked that evening. `trick` is the chef trick number shown on the recipe card. Ingredients are in the Ingredients table.

| id | name | kcal | protein | carbs | fat | sauce | cook | trick | description |
|---|---|---|---|---|---|---|---|---|---|
| breakfast | Breakfast shake | 500 | 80 |  |  | - | - |  | Shake with 50 g whey and 5 g creatine, Oikos Pro (7 oz), ½ grapefruit, string cheese, psyllium 5 g |
| A | Lemon-herb chicken bowl | 540 | 57 | 48 | 11 | Lemon-garlic yogurt sauce (or swap: green herb or ginger-scallion, then skip the oil) | prep | 1 |  |
| B | Cilantro-lime chicken burrito bowl | 545 | 54 | 52 | 12 | Lime crema + pico de gallo | prep | 6 |  |
| C | Miso-ginger salmon and potatoes | 540 | 48 | 60 | 14 | Miso glaze (or Dijon-dill) | 20 min | 3 |  |
| D | Carne asada steak tacos | 535 | 45 | 55 | 15 | Pickled red onion + salsa verde | 15–20 min | 4 | Marinate the steak 30 min to overnight. |
| E | Garlic-ginger shrimp stir-fry | 550 | 58 | 58 | 8 | Stir-fry sauce (in recipe) | 15 min | 8 |  |
| F | Lean beef Bolognese | 550 | 47 | 60 | 13 | - | 20 min | 7 |  |
| G | Greek chicken plate | 500 | 54 | 44 | 10 | Tzatziki | prep | 2 |  |
| T | Thanksgiving plate |  | 60 |  |  | - | - |  | Half the plate turkey breast (8–10 oz), your two favorite sides, one dessert portion. Walk 20–30 min after. |

## Ingredients

One row per ingredient per serving. `section` groups the grocery list. `batch` is `sun`, `wed`, `sun/wed` or `day-of`, for the prep screen.

| meal | ingredient | qty | unit | section | batch |
|---|---|---|---|---|---|
| A | chicken breast (lemon-herb) | 200 | g | Meat & fish | sun/wed |
| A | brown rice, cooked | 140 | g | Grains | sun/wed |
| A | broccoli | 150 | g | Produce | sun/wed |
| A | olive oil | 1 | tsp | Pantry | sun/wed |
| A | lemon | 0.5 | each | Produce | day-of |
| A | scallion | 1 | each | Produce | sun/wed |
| A | rice vinegar | 1 | tsp | Pantry | day-of |
| A | lemon-garlic yogurt sauce | 40 | g | Sauce | sun |
| B | chicken breast (cumin-lime) | 180 | g | Meat & fish | sun/wed |
| B | brown rice, cooked (cilantro-lime) | 100 | g | Grains | sun/wed |
| B | black beans, canned | 80 | g | Pantry | sun/wed |
| B | pico de gallo | 60 | g | Sauce | sun/wed |
| B | romaine | 50 | g | Produce | sun/wed |
| B | avocado | 40 | g | Produce | day-of |
| B | lime crema | 30 | g | Sauce | sun |
| B | lime | 0.5 | each | Produce | day-of |
| C | wild salmon | 170 | g | Meat & fish | day-of |
| C | Yukon potatoes | 250 | g | Produce | day-of |
| C | asparagus | 150 | g | Produce | day-of |
| C | olive oil | 1 | tsp | Pantry | day-of |
| C | white miso | 1 | tbsp | Pantry | day-of |
| C | honey | 1 | tsp | Pantry | day-of |
| C | ginger | 0.5 | tsp | Produce | day-of |
| C | lemon | 0.25 | each | Produce | day-of |
| D | top sirloin, trimmed | 170 | g | Meat & fish | day-of |
| D | corn tortillas | 4 | each | Grains | day-of |
| D | cabbage | 100 | g | Produce | sun |
| D | pickled red onion | 30 | g | Sauce | sun |
| D | salsa verde | 30 | g | Pantry | day-of |
| D | cotija | 10 | g | Dairy | day-of |
| D | lime | 0.5 | each | Produce | day-of |
| D | low-sodium soy sauce | 1 | tsp | Pantry | day-of |
| E | shrimp | 250 | g | Meat & fish | day-of |
| E | snap peas | 100 | g | Produce | day-of |
| E | bok choy | 100 | g | Produce | day-of |
| E | mushrooms | 50 | g | Produce | day-of |
| E | jasmine rice, cooked | 130 | g | Grains | day-of |
| E | low-sodium soy sauce | 1 | tbsp | Pantry | day-of |
| E | rice vinegar | 1 | tbsp | Pantry | day-of |
| E | honey | 1 | tsp | Pantry | day-of |
| E | cornstarch | 1 | tsp | Pantry | day-of |
| E | ginger | 1 | tsp | Produce | day-of |
| E | avocado oil | 1 | tsp | Pantry | day-of |
| E | toasted sesame oil | 0.5 | tsp | Pantry | day-of |
| E | scallion | 1 | each | Produce | day-of |
| F | 95% lean ground beef | 150 | g | Meat & fish | day-of |
| F | dry pasta | 60 | g | Grains | day-of |
| F | mushrooms | 60 | g | Produce | day-of |
| F | tomato paste | 1 | tbsp | Pantry | day-of |
| F | marinara | 125 | g | Pantry | day-of |
| F | balsamic vinegar | 1 | tsp | Pantry | day-of |
| F | parmesan | 10 | g | Dairy | day-of |
| F | basil | 3 | leaves | Produce | day-of |
| G | chicken breast (lemon-herb) | 180 | g | Meat & fish | sun/wed |
| G | whole-wheat pita | 1 | each | Grains | day-of |
| G | English cucumber | 80 | g | Produce | sun/wed |
| G | tomato | 100 | g | Produce | sun/wed |
| G | red onion | 20 | g | Produce | sun/wed |
| G | red wine vinegar | 1 | tsp | Pantry | day-of |
| G | tzatziki | 75 | g | Sauce | sun |
| G | feta | 15 | g | Dairy | day-of |

## Recipes

| meal | step | text |
|---|---|---|
| A | 1 | Air-fry the dry-brined chicken at 400°F to 165°F. |
| A | 2 | Toss the warm rice with rice vinegar and scallions. |
| A | 3 | Air-fry the broccoli with oil, garlic and chili flakes until charred. |
| A | 4 | At the table: lemon squeeze plus the yogurt sauce. |
| B | 1 | Season the chicken with cumin, chili powder, garlic, oregano and lime, then air-fry to 165°F. |
| B | 2 | Stir lime zest, juice, cilantro and salt into the warm rice. |
| B | 3 | Warm the beans with cumin and garlic. |
| B | 4 | Build the bowl: lettuce, rice, beans, chicken, pico, avocado, lime crema. |
| C | 1 | Brush the salmon with miso glaze and air-fry at 400°F for 8–10 min. |
| C | 2 | Air-fry the potatoes with oil, garlic powder and rosemary for 18–20 min. |
| C | 3 | Roast the asparagus for 6–8 min, then add lemon zest. |
| D | 1 | Marinate the steak 30 min to overnight in lime, garlic, cumin and soy. |
| D | 2 | Sear on high heat to medium, rest 5 min, then slice thin across the grain. |
| D | 3 | Char the tortillas in a dry pan. |
| D | 4 | Top with slaw, pickled onion, salsa verde and cotija. |
| E | 1 | Mix the sauce: soy, rice vinegar, honey, ginger, garlic, chili flakes, cornstarch and 2 tbsp water. |
| E | 2 | Stir-fry the vegetables in the avocado oil on high for 3 min. |
| E | 3 | Add the shrimp for 2–3 min until pink. |
| E | 4 | Pour in the sauce and toss for 1 min. |
| E | 5 | Finish with sesame oil and scallions over the rice. |
| F | 1 | Brown the beef hard without stirring for 3 min. |
| F | 2 | Add the mushrooms and cook them dry. |
| F | 3 | Stir in the tomato paste and cook until it darkens. |
| F | 4 | Add garlic, oregano and chili flakes, then the marinara and balsamic, and simmer 10 min. |
| F | 5 | Serve over pasta with basil and parmesan. |
| G | 1 | Air-fry the chicken (lemon, garlic, oregano, smoked paprika) to 165°F. |
| G | 2 | Warm the pita. |
| G | 3 | Dress the cucumber, tomato and onion with red wine vinegar and oregano when you eat. |
| G | 4 | Serve with tzatziki and feta. |

## Sauces

`batch_g` is how many grams one batch makes, used for prep and groceries.

| sauce | makes | recipe | per serving | keeps | batch_g |
|---|---|---|---|---|---|
| Tzatziki | 4 × 75 g | 200 g 0% Greek yogurt; ½ English cucumber, grated, salted, squeezed dry; 1 small garlic clove, grated; 1 tbsp lemon juice + ½ tsp zest; 1 tbsp fresh dill (or mint); 1 tsp olive oil; ¼ tsp salt; pepper. Rest 30 min. | ~45 kcal, 5 g protein | 3–4 days | 300 |
| Lemon-garlic yogurt sauce | 6 × 40 g | 200 g 0% Greek yogurt, juice + zest of 1 lemon, 1 grated garlic clove, salt, pepper, water to thin | ~25 kcal, 4 g protein | 4 days | 240 |
| Lime crema | 4 × 30 g | 100 g 0% Greek yogurt, juice of 1 lime, pinch of salt | ~20 kcal, 3 g protein | 4 days | 120 |
| Green herb sauce | ~8 tbsp | Blend 1 cup parsley, ½ cup cilantro, 1 garlic clove, 3 tbsp red wine vinegar, 2 tbsp olive oil, 3 tbsp water, chili flakes, salt | ~40 kcal per tbsp | 5 days | 120 |
| Ginger-scallion sauce | ~6 tbsp | 4 scallions finely chopped, 1 tbsp grated ginger, 1 tbsp rice vinegar, 1 tbsp low-sodium soy, 2 tsp neutral oil | ~25 kcal per tbsp | 5 days | 90 |
| Quick-pickled red onion | 1 jar | 1 red onion sliced thin, ½ cup vinegar, ½ cup water, 1 tsp sugar, 1 tsp salt. Ready in 30 min. | ~5 kcal | 2 weeks | 200 |
| Pico de gallo | 4 × 60 g | 2 tomatoes, ¼ red onion, cilantro, lime, salt; raw jalapeño optional | ~15 kcal | 2–3 days | 240 |
| Miso glaze | per fillet | 1 tbsp white miso, 1 tsp honey, 1 tsp rice vinegar, ½ tsp grated ginger | ~55 kcal | make fresh | 0 |

## Sauce ingredients

What one batch of each sauce needs. Used for the grocery list. Garlic and salt are in Pantry staples.

| sauce | ingredient | qty | unit | section |
|---|---|---|---|---|
| Tzatziki | 0% Greek yogurt | 200 | g | Dairy |
| Tzatziki | English cucumber | 0.5 | each | Produce |
| Tzatziki | lemon | 0.5 | each | Produce |
| Tzatziki | fresh dill | 1 | tbsp | Produce |
| Tzatziki | olive oil | 1 | tsp | Pantry |
| Lemon-garlic yogurt sauce | 0% Greek yogurt | 200 | g | Dairy |
| Lemon-garlic yogurt sauce | lemon | 1 | each | Produce |
| Lime crema | 0% Greek yogurt | 100 | g | Dairy |
| Lime crema | lime | 1 | each | Produce |
| Green herb sauce | parsley | 1 | cup | Produce |
| Green herb sauce | red wine vinegar | 3 | tbsp | Pantry |
| Green herb sauce | olive oil | 2 | tbsp | Pantry |
| Ginger-scallion sauce | scallion | 4 | each | Produce |
| Ginger-scallion sauce | ginger | 1 | tbsp | Produce |
| Ginger-scallion sauce | rice vinegar | 1 | tbsp | Pantry |
| Ginger-scallion sauce | low-sodium soy sauce | 1 | tbsp | Pantry |
| Quick-pickled red onion | red onion | 1 | each | Produce |
| Quick-pickled red onion | white vinegar | 0.5 | cup | Pantry |
| Quick-pickled red onion | sugar | 1 | tsp | Pantry |
| Pico de gallo | tomato | 2 | each | Produce |
| Pico de gallo | red onion | 0.25 | each | Produce |
| Pico de gallo | lime | 0.5 | each | Produce |

## Chef tricks

| n | trick |
|---|---|
| 1 | Dry-brine the chicken the night before: about ¾ tsp kosher salt per 500 g, uncovered in the fridge. |
| 2 | Stop at 165°F. Use an instant-read thermometer. Overcooking is why prep chicken tastes dry. |
| 3 | Get color: pat food dry, use a single layer, air-fry at 400°F. |
| 4 | Add acid when you eat, not when you prep. Lemon, lime or vinegar makes day-4 food taste fresh. |
| 5 | Keep sauces in separate containers and add them at the table. |
| 6 | Toast dry spices for 30 s in a dry pan. |
| 7 | Use almost calorie-free umami: low-sodium soy, miso, tomato paste cooked dark, a little parmesan. |
| 8 | Finish with fresh herbs, citrus zest or scallions. |
| 9 | Reheat covered with a splash of water. |

## Prep sessions

Cooked chicken keeps 3–4 days, so prep happens twice. `brine` is the evening before, when the chicken gets dry-brined.

| day | covers | minutes | time | brine |
|---|---|---|---|---|
| Sun | Sun Mon Tue Wed | 90 | 11:00 AM | Sat |
| Wed | Thu Fri Sat | 45 | 8:00 PM | Tue |

## Prep steps

The prep checklist, in order. A step shows only when its `needs` ingredient is in that session. `{qty:name}` fills in the amount; `{buy:name}` fills in the dry/store amount.

| needs | step |
|---|---|
| chicken breast | Take the dry-brined chicken out of the fridge. Heat the air fryer to 400°F. |
| brown rice, cooked | Start the rice: {buy:brown rice, cooked} dry brown rice makes {qty:brown rice, cooked} cooked. |
| brown rice, cooked (cilantro-lime) | Cook {buy:brown rice, cooked (cilantro-lime)} more dry brown rice for {qty:brown rice, cooked (cilantro-lime)} cooked. While warm, stir in lime zest, juice, cilantro and salt. |
| chicken breast (lemon-herb) | Season {qty:chicken breast (lemon-herb)} chicken with lemon, garlic, oregano and smoked paprika. Air-fry in a single layer to 165°F, in batches. |
| chicken breast (cumin-lime) | Toast the cumin 30 s. Season {qty:chicken breast (cumin-lime)} chicken with cumin, chili powder, garlic, oregano and lime. Air-fry to 165°F. |
| broccoli | Toss {qty:broccoli} broccoli with oil, garlic and chili flakes. Air-fry until charred, 8–10 min. |
| black beans, canned | Warm {qty:black beans, canned} black beans with cumin and garlic. |
| cabbage | Shred {qty:cabbage} cabbage for the taco slaw. Dress it with lime when you eat. |
| English cucumber | Chop {qty:English cucumber} cucumber, {qty:tomato} tomato and {qty:red onion} red onion for the Greek salad. Dress it when you eat. |
| romaine | Wash and dry {qty:romaine} romaine. |
| scallion | Slice {qty:scallion} scallions. |
| sauces | Make the sauces listed below. Each goes in its own container. |
| chicken breast | Rest the chicken 5 min, slice, and portion into the labeled containers below. |

## Store units

How ingredients become grocery amounts. `factor` converts the recipe unit to `store_unit`; `round` rounds up to that step.

| ingredient | unit | buy_as | factor | store_unit | round | note |
|---|---|---|---|---|---|---|
| chicken breast (lemon-herb) | g | chicken breast | 0.0022046 | lb | 0.25 |  |
| chicken breast (cumin-lime) | g | chicken breast | 0.0022046 | lb | 0.25 |  |
| wild salmon | g | wild salmon | 0.0022046 | lb | 0.25 |  |
| top sirloin, trimmed | g | top sirloin | 0.0022046 | lb | 0.25 |  |
| shrimp | g | shrimp (peeled) | 0.0022046 | lb | 0.25 |  |
| 95% lean ground beef | g | 95% lean ground beef | 0.0022046 | lb | 0.25 |  |
| brown rice, cooked | g | brown rice (dry) | 0.36 | g | 25 | or 250 g microwave pouches |
| brown rice, cooked (cilantro-lime) | g | brown rice (dry) | 0.36 | g | 25 | or 250 g microwave pouches |
| jasmine rice, cooked | g | jasmine rice (dry) | 0.33 | g | 25 |  |
| broccoli | g | broccoli | 0.0022046 | lb | 0.25 |  |
| Yukon potatoes | g | Yukon potatoes | 0.0022046 | lb | 0.25 |  |
| asparagus | g | asparagus | 0.0022046 | lb | 0.25 | about 1 lb per bunch |
| snap peas | g | snap peas | 0.0022046 | lb | 0.25 |  |
| bok choy | g | bok choy | 0.0022046 | lb | 0.25 |  |
| mushrooms | g | mushrooms | 0.0022046 | lb | 0.25 |  |
| cabbage | g | cabbage | 0.0011 | head | 0.5 |  |
| romaine | g | romaine hearts | 0.005 | each | 1 |  |
| romaine (dinner salad) | g | romaine hearts | 0.005 | each | 1 |  |
| English cucumber | g | English cucumber | 0.0025 | each | 1 |  |
| tomato | g | tomatoes | 0.0083 | each | 1 |  |
| red onion | g | red onion | 0.005 | each | 1 |  |
| avocado | g | avocado | 0.0067 | each | 1 |  |
| black beans, canned | g | black beans (15 oz can) | 0.0042 | can | 1 |  |
| scallion | each | scallions | 0.125 | bunch | 1 |  |
| 0% Greek yogurt | g | 0% Greek yogurt | 1 | g | 50 |  |

## Pantry staples

Every meal uses these. They show under "check stock".

| item |
|---|
| garlic |
| kosher salt |
| smoked paprika |
| cumin |
| chili powder |
| oregano |
| rosemary |
| garlic powder |
| chili flakes |
| dill |
| cilantro |
| parsley |

## Daily groceries

Fixed items, counted per day. `when` uses the same words as the Checklist.

| item | qty | unit | when | section |
|---|---|---|---|---|
| whey isolate | 2 | scoops | home | Pantry |
| Oikos Pro (7 oz) | 1 | each | home | Dairy |
| grapefruit | 0.5 | each | home | Produce |
| string cheese | 1 | each | home | Dairy |
| psyllium husk | 10 | g | home | Pantry |
| creatine monohydrate | 5 | g | home | Pantry |
| banana | 1 | each | home | Produce |
| pumpkin seeds | 1 | oz | home | Pantry |
| rice cakes | 2 | each | lifting refill | Grains |
| honey | 1 | tbsp | lifting refill | Pantry |
| Isopure | 1.5 | scoops | home | Pantry |
| romaine (dinner salad) | 75 | g | home dinner | Produce |
| lemon | 0.25 | each | home dinner | Produce |

## Refill extras

Added on each refill day for about +150 g carbs.

| item | qty | unit | section | note |
|---|---|---|---|---|
| jasmine rice, cooked | 300 | g | Grains | ~85 g carbs, with lunch and dinner |
| Yukon potatoes | 200 | g | Produce | ~35 g carbs |
| banana | 1 | each | Produce | ~27 g carbs |

## Travel packing

| item | note |
|---|---|
| Single-serve whey or Isopure packets | One per 3–4 waking hours of travel |
| Lean jerky |  |
| Tuna or chicken pouches |  |
| Rice cakes |  |
| Bars without sugar alcohols | Sugar alcohols cause gas |
| Compression socks | Below-knee, graduated |
| Melatonin | 0.5–5 mg |

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

### Pump session

| exercise | sets | reps | rir | rest | peak | key | demo |
|---|---|---|---|---|---|---|---|
| Push-up or machine chest press | 3 | 15 | 2–3 | 45–60 s |  |  | push up |
| Cable or band lateral raise | 3 | 20 | 2–3 | 45–60 s |  |  | band lateral raise |
| Cable row | 2 | 15 | 2–3 | 45–60 s |  |  | seated cable row |
| Curl | 2 | 15 | 2–3 | 45–60 s |  |  | dumbbell curl |
| Triceps pushdown | 2 | 15 | 2–3 | 45–60 s |  |  |  |

## Progression

When every set reaches the top of the rep range at the target RIR, add 2.5–5 lb on upper lifts or 5–10 lb on lower lifts. In a deficit, holding your loads counts as a win.

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
| Mexican | Chicken or shrimp bowl, corn tortillas, salsa | Chips, cheese, sour cream |
| Sushi | Sashimi, 1 simple roll, edamame, miso | Tempura, mayo rolls |
| Mediterranean | Chicken or fish plate, rice or pita, salad, sauces on the side | Fried items |
| Drinks (one weekend night) | Clear spirit with soda and lime, 2 at most, water in between | Beer, always |
