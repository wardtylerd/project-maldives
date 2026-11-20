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
| Evening | 8:00 PM | brine | Dry-brine {brine_amt} chicken for tomorrow's prep | home brine |  | Pat it dry, sprinkle {brine_salt} Morton kosher salt ({brine_salt_dc} if it's Diamond Crystal) on every side, and leave it uncovered on a plate in the fridge. |  |
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

`cook`: `prep` means it comes from the Sunday or Wednesday meal prep; anything else is how long it takes to cook that evening. `trick` is the chef trick number shown on the recipe card. Ingredients are in the Ingredients table, steps in Recipes.

| id | name | kcal | protein | carbs | fat | sauce | cook | trick | description |
|---|---|---|---|---|---|---|---|---|---|
| breakfast | Breakfast shake | 500 | 80 |  |  | - | - |  | Shake with 50 g whey and 5 g creatine, Oikos Pro (7 oz), ½ grapefruit, string cheese, psyllium 5 g |
| A | Lemon-herb chicken bowl | 540 | 57 | 48 | 11 | Lemon-garlic yogurt sauce (swap: green herb or ginger-scallion sauce, then skip the broccoli oil) | prep | 1 | Chicken, brown rice and charred broccoli with a lemon-garlic yogurt sauce. |
| B | Cilantro-lime chicken burrito bowl | 570 | 59 | 52 | 13 | Lime crema + pico de gallo | prep | 6 | Cumin-lime chicken, cilantro-lime rice and black beans over romaine. |
| C | Miso-ginger salmon and potatoes | 540 | 48 | 60 | 14 | Miso glaze (in the recipe) | 25 min | 3 | Miso-glazed salmon with crispy potatoes and asparagus, all in the air fryer. |
| D | Carne asada steak tacos | 535 | 45 | 55 | 15 | Pickled red onion + salsa verde | 20 min + marinade | 4 | Start the marinade in the morning, or at least 30 min before you cook. |
| E | Garlic-ginger shrimp stir-fry | 550 | 58 | 58 | 8 | Stir-fry sauce (in the recipe) | 15 min | 8 | Shrimp, snap peas, bok choy and mushrooms over jasmine rice. |
| F | Lean beef Bolognese | 550 | 47 | 60 | 13 | - | 25 min | 7 | Deeply browned lean beef and mushrooms in marinara over pasta. |
| G | Greek chicken plate | 525 | 59 | 44 | 11 | Tzatziki | prep | 2 | Lemon-herb chicken, Greek salad, tzatziki, feta and warm pita. |
| T | Thanksgiving plate |  | 60 |  |  | - | - |  | Half the plate turkey breast (8–10 oz), your two favorite sides, one dessert portion. Walk 20–30 min after. |

## Ingredients

One row per ingredient for one serving, in US kitchen units (`oz` is weight; `cup`, `tbsp`, `tsp` are volume; `each` counts). Leave `qty` empty for "a pinch" or "a light coat". In `item`, `{s}` or `{f|ves}` handle plurals.
- `part` groups the recipe card. On half-rice nights the rice itself (the Grains row in a part named `Rice`) is halved.
- `prep` says where the row goes at meal prep: `brine` (the night before), `hot` (main container, reheated), `cold` (side container), `jar` (sauce jar), `bag` (prepped for a cooked dinner), `-` (made or added when you eat or cook).
- `buy` is the grocery-list name (see Store units); `-` means it's a pantry staple. `section` groups the grocery list.

| meal | part | qty | unit | item | prep | buy | section |
|---|---|---|---|---|---|---|---|
| A | Night before | 0.33 | tsp | kosher salt (Morton; ¾ tsp per lb of chicken) | brine | - | Staple |
| A | Chicken | 7 | oz | chicken breast, boneless skinless, raw | hot | chicken breast | Meat & fish |
| A | Chicken | 0.5 | tsp | dried oregano | hot | - | Staple |
| A | Chicken | 0.5 | tsp | smoked paprika | hot | - | Staple |
| A | Chicken | 0.25 | tsp | garlic powder | hot | - | Staple |
| A | Chicken | 0.25 | tsp | lemon zest | hot | lemon zest | Produce |
| A | Chicken | 0.125 | tsp | black pepper | hot | - | Staple |
| A | Chicken |  |  | olive-oil spray, a light coat | hot | - | Staple |
| A | Rice | 0.75 | cup | cooked brown rice | hot | brown rice, cooked | Grains |
| A | Rice | 1 | tsp | rice vinegar | hot | rice vinegar | Pantry |
| A | Rice | 1 | each | scallion{s}, thinly sliced | hot | scallions | Produce |
| A | Broccoli | 1.5 | cup | broccoli florets, bite-size | hot | broccoli | Produce |
| A | Broccoli | 1 | tsp | olive oil | hot | olive oil | Pantry |
| A | Broccoli | 0.125 | tsp | garlic powder | hot | - | Staple |
| A | Broccoli |  |  | a pinch each of chili flakes and salt | hot | - | Staple |
| A | At the table | 2.5 | tbsp | Lemon-garlic yogurt sauce | jar | - | Sauce |
| A | At the table | 0.25 | each | lemon, cut into a wedge | - | lemon | Produce |
| B | Night before | 0.33 | tsp | kosher salt (Morton; ¾ tsp per lb of chicken) | brine | - | Staple |
| B | Chicken | 7 | oz | chicken breast, boneless skinless, raw | hot | chicken breast | Meat & fish |
| B | Chicken | 0.75 | tsp | ground cumin, toasted | hot | - | Staple |
| B | Chicken | 0.5 | tsp | chili powder | hot | - | Staple |
| B | Chicken | 0.25 | tsp | garlic powder | hot | - | Staple |
| B | Chicken | 0.25 | tsp | dried oregano | hot | - | Staple |
| B | Chicken | 0.5 | tsp | lime zest | hot | lime zest | Produce |
| B | Chicken |  |  | olive-oil spray, a light coat | hot | - | Staple |
| B | Rice | 0.5 | cup | cooked brown rice | hot | brown rice, cooked | Grains |
| B | Rice | 1.5 | tsp | lime juice | hot | lime juice | Produce |
| B | Rice | 1 | tbsp | cilantro, chopped | hot | cilantro | Produce |
| B | Rice |  |  | a pinch of salt | hot | - | Staple |
| B | Beans | 0.5 | cup | black beans (canned), rinsed and drained | hot | black beans | Pantry |
| B | Beans | 0.25 | tsp | ground cumin | hot | - | Staple |
| B | Beans | 0.125 | tsp | garlic powder | hot | - | Staple |
| B | Beans | 1 | tbsp | water | hot | - | Staple |
| B | Romaine | 1 | cup | romaine, chopped | cold | romaine | Produce |
| B | At the table | 0.25 | cup | Pico de gallo | jar | - | Sauce |
| B | At the table | 2 | tbsp | Lime crema | jar | - | Sauce |
| B | At the table | 0.25 | each | avocado, sliced fresh | - | avocado | Produce |
| B | At the table | 0.25 | each | lime, cut into a wedge | - | lime | Produce |
| C | Salmon | 6 | oz | wild salmon fillet | - | wild salmon | Meat & fish |
| C | Miso glaze | 1 | tbsp | white miso | - | white miso | Pantry |
| C | Miso glaze | 1 | tsp | honey | - | honey | Pantry |
| C | Miso glaze | 1 | tsp | rice vinegar | - | rice vinegar | Pantry |
| C | Miso glaze | 0.5 | tsp | fresh ginger, finely grated | - | ginger | Produce |
| C | Miso glaze | 1 | tsp | water | - | - | Staple |
| C | Potatoes | 9 | oz | Yukon Gold potatoes (about 1½ medium), cut in 1-inch chunks | - | Yukon Gold potatoes | Produce |
| C | Potatoes | 1 | tsp | olive oil | - | olive oil | Pantry |
| C | Potatoes | 0.25 | tsp | garlic powder | - | - | Staple |
| C | Potatoes | 0.25 | tsp | dried rosemary, crumbled | - | - | Staple |
| C | Potatoes | 0.25 | tsp | kosher salt | - | - | Staple |
| C | Asparagus | 5 | oz | asparagus (about 10 spears), woody ends snapped off | - | asparagus | Produce |
| C | Asparagus |  |  | olive-oil spray and a pinch of salt | - | - | Staple |
| C | To finish | 0.25 | each | lemon (zest it, then cut a wedge) | - | lemon | Produce |
| D | Steak | 6 | oz | top sirloin steak, trimmed | - | top sirloin | Meat & fish |
| D | Marinade | 1 | tbsp | lime juice | - | lime juice | Produce |
| D | Marinade | 1 | tsp | low-sodium soy sauce | - | low-sodium soy sauce | Pantry |
| D | Marinade | 1 | each | small garlic clove{s}, grated | - | - | Staple |
| D | Marinade | 0.5 | tsp | ground cumin | - | - | Staple |
| D | Marinade | 0.25 | tsp | chili powder | - | - | Staple |
| D | Marinade | 0.125 | tsp | black pepper | - | - | Staple |
| D | Slaw | 1.5 | cup | green cabbage, thinly shredded | bag | cabbage | Produce |
| D | Slaw | 1 | tsp | lime juice | - | lime juice | Produce |
| D | Slaw | 1 | tbsp | cilantro, chopped | - | cilantro | Produce |
| D | Slaw |  |  | a pinch of salt | - | - | Staple |
| D | Tacos | 4 | each | corn tortilla{s}, 6-inch | - | corn tortillas | Grains |
| D | Tacos | 3 | tbsp | Quick-pickled red onion | jar | - | Sauce |
| D | Tacos | 2 | tbsp | salsa verde (jarred) | - | salsa verde | Pantry |
| D | Tacos | 1.5 | tbsp | cotija, crumbled | - | cotija | Dairy |
| E | Shrimp | 9 | oz | raw shrimp, peeled and deveined (thawed) | - | shrimp | Meat & fish |
| E | Vegetables | 0.75 | cup | mushrooms, sliced | - | mushrooms | Produce |
| E | Vegetables | 1 | cup | snap peas, strings pulled | - | snap peas | Produce |
| E | Vegetables | 2 | each | baby bok choy, halved lengthwise and rinsed | - | baby bok choy | Produce |
| E | Vegetables | 1 | each | scallion{s}, sliced (whites and greens kept apart) | - | scallions | Produce |
| E | Vegetables | 1 | tsp | avocado oil | - | avocado oil | Pantry |
| E | Stir-fry sauce | 1 | tbsp | low-sodium soy sauce | - | low-sodium soy sauce | Pantry |
| E | Stir-fry sauce | 1 | tbsp | rice vinegar | - | rice vinegar | Pantry |
| E | Stir-fry sauce | 1 | tsp | honey | - | honey | Pantry |
| E | Stir-fry sauce | 1 | tsp | fresh ginger, finely grated | - | ginger | Produce |
| E | Stir-fry sauce | 1 | each | garlic clove{s}, grated | - | - | Staple |
| E | Stir-fry sauce | 0.25 | tsp | chili flakes | - | - | Staple |
| E | Stir-fry sauce | 1 | tsp | cornstarch | - | cornstarch | Pantry |
| E | Stir-fry sauce | 2 | tbsp | water | - | - | Staple |
| E | Rice | 0.75 | cup | cooked jasmine rice | - | jasmine rice, cooked | Grains |
| E | To finish | 0.5 | tsp | toasted sesame oil | - | toasted sesame oil | Pantry |
| F | Sauce | 5.33 | oz | 95% lean ground beef (⅓ of a 1-lb pack) | - | 95% lean ground beef | Meat & fish |
| F | Sauce | 0.75 | cup | cremini mushrooms, finely chopped | - | mushrooms | Produce |
| F | Sauce | 1 | tbsp | tomato paste | - | tomato paste | Pantry |
| F | Sauce | 1 | each | garlic clove{s}, minced | - | - | Staple |
| F | Sauce | 0.5 | tsp | dried oregano | - | - | Staple |
| F | Sauce | 0.25 | tsp | chili flakes | - | - | Staple |
| F | Sauce | 0.5 | cup | marinara (jarred) | - | marinara | Pantry |
| F | Sauce | 1 | tsp | balsamic vinegar | - | balsamic vinegar | Pantry |
| F | Sauce |  |  | olive-oil spray and a pinch of salt | - | - | Staple |
| F | Pasta | 2 | oz | dry short pasta, like penne or rigatoni (about ½ cup) | - | dry pasta | Grains |
| F | Pasta | 2 | tsp | kosher salt, for 2 quarts of pasta water | - | - | Staple |
| F | To finish | 2 | tbsp | parmesan, finely grated | - | parmesan | Dairy |
| F | To finish | 3 | each | basil lea{f|ves}, torn | - | basil | Produce |
| G | Night before | 0.33 | tsp | kosher salt (Morton; ¾ tsp per lb of chicken) | brine | - | Staple |
| G | Chicken | 7 | oz | chicken breast, boneless skinless, raw | hot | chicken breast | Meat & fish |
| G | Chicken | 0.5 | tsp | dried oregano | hot | - | Staple |
| G | Chicken | 0.5 | tsp | smoked paprika | hot | - | Staple |
| G | Chicken | 0.25 | tsp | garlic powder | hot | - | Staple |
| G | Chicken | 0.25 | tsp | lemon zest | hot | lemon zest | Produce |
| G | Chicken | 0.125 | tsp | black pepper | hot | - | Staple |
| G | Chicken |  |  | olive-oil spray, a light coat | hot | - | Staple |
| G | Greek salad | 0.67 | cup | English cucumber, ½-inch dice | cold | English cucumber | Produce |
| G | Greek salad | 0.67 | cup | cherry tomatoes, halved | cold | cherry tomatoes | Produce |
| G | Greek salad | 2 | tbsp | red onion, finely diced | cold | red onion | Produce |
| G | At the table | 1 | tsp | red wine vinegar | - | red wine vinegar | Pantry |
| G | At the table | 0.25 | tsp | dried oregano | - | - | Staple |
| G | At the table |  |  | a pinch of salt | - | - | Staple |
| G | At the table | 0.33 | cup | Tzatziki | jar | - | Sauce |
| G | At the table | 2 | tbsp | feta, crumbled | - | feta | Dairy |
| G | At the table | 1 | each | whole-wheat pita{s} | - | whole-wheat pitas | Grains |

## Recipes

`phase`: `cook` is the full recipe for one serving. `serve` is what to do at mealtime with a container from meal prep.

| meal | step | phase | text |
|---|---|---|---|
| A | 1 | serve | Lift one corner of the lid, sprinkle 1 tbsp water over the rice and microwave 2 min. Stir, then 30–60 s more until steaming. |
| A | 2 | serve | Spoon the sauce on cold, straight from the jar (don't microwave it). Squeeze the lemon wedge over everything. |
| A | 1 | cook | The night before: pat the chicken dry, sprinkle the salt on every side and leave it uncovered on a plate in the fridge. |
| A | 2 | cook | Heat the air fryer to 400°F. If the breast is thicker than 1 inch, slice it in half horizontally so it cooks evenly. |
| A | 3 | cook | Mist the chicken with oil spray, then coat it with the oregano, paprika, garlic powder, lemon zest and pepper. |
| A | 4 | cook | Air-fry 10 min, flip, then 6–10 min more until the thickest part reads 165°F. Rest 5 min, then slice. |
| A | 5 | cook | Toss the broccoli with the oil, garlic powder, chili flakes and salt. Air-fry at 400°F for 8–10 min, shaking halfway, until the edges char. |
| A | 6 | cook | Stir the rice vinegar and scallion into the warm rice. |
| A | 7 | cook | Bowl it: rice, broccoli, chicken. Spoon the sauce over and squeeze the lemon on top. |
| B | 1 | serve | Microwave the hot container (chicken, rice, beans) with the lid ajar and 1 tbsp water over the rice: 2 min, stir, then 30–60 s more. |
| B | 2 | serve | Tip it over the cold romaine. Add the pico and lime crema straight from the jars. |
| B | 3 | serve | Slice ¼ avocado on top and squeeze the lime wedge. Wrap the rest of the avocado tight with the pit in; it keeps a day. |
| B | 1 | cook | The night before: pat the chicken dry, salt every side and leave it uncovered on a plate in the fridge. |
| B | 2 | cook | Toast the cumin in a dry pan over medium heat for 30–60 s, until it smells nutty. Mix it with the chili powder, garlic powder, oregano and lime zest. |
| B | 3 | cook | Heat the air fryer to 400°F. Mist the chicken with oil spray and coat it with the spice mix. |
| B | 4 | cook | Air-fry 10 min, flip, then 6–10 min more until it reads 165°F. Rest 5 min, then slice. |
| B | 5 | cook | Warm the beans with the cumin, garlic powder and water in a small pot over medium heat, 3–4 min. |
| B | 6 | cook | Stir the lime juice, cilantro and salt into the warm rice. |
| B | 7 | cook | Bowl it: romaine, rice, beans, chicken, then pico, lime crema, avocado and a squeeze of lime. |
| C | 1 | cook | Heat the air fryer to 400°F. Toss the potatoes with the oil, garlic powder, rosemary and salt. |
| C | 2 | cook | Air-fry the potatoes 18–20 min, shaking every 6 min, until browned and a knife slides in easily. Tip them onto a plate and cover with foil. |
| C | 3 | cook | While they cook, stir the miso, honey, rice vinegar, ginger and water into a smooth glaze. Pat the salmon dry. |
| C | 4 | cook | Set the salmon skin-side down on a piece of foil or parchment in the basket. Brush the glaze over the top and sides. Lay the asparagus beside it, mist with oil and salt it. |
| C | 5 | cook | Air-fry 7–9 min, until the salmon flakes with a fork and reads 145°F in the thickest part. If the glaze gets dark before then, lay foil loosely on top. |
| C | 6 | cook | Zest the lemon over the asparagus, then squeeze the wedge over the plate. |
| D | 1 | cook | Marinate: mix the lime juice, soy, garlic, cumin, chili powder and pepper in a zip bag. Add the steak and press out the air. 30 min on the counter, or all day in the fridge. |
| D | 2 | cook | Toss the cabbage with the lime juice, cilantro and a pinch of salt. |
| D | 3 | cook | Pat the steak dry with paper towels (a wet steak won't brown). Heat a cast-iron or heavy skillet on high for 3 min, then mist it with oil spray. |
| D | 4 | cook | Sear 3–4 min per side without moving it, to 140°F for medium; it climbs a few degrees as it rests. Rest it on a board for 5 min. |
| D | 5 | cook | While it rests, char the tortillas in the dry hot pan (or over a gas flame) 20–30 s per side, until spotted. Stack them in a clean towel so they stay soft. |
| D | 6 | cook | Slice the steak ¼ inch thin across the grain: find the lines running through the meat and cut across them. |
| D | 7 | cook | Build 4 tacos: slaw, steak, pickled onion, salsa verde, cotija. |
| E | 1 | cook | Microwave the jasmine rice pouch 90 s and measure out your portion. Refrigerate the rest; it keeps 3 days. |
| E | 2 | cook | Stir the soy, rice vinegar, honey, ginger, garlic, chili flakes, cornstarch and water in a small bowl until the cornstarch dissolves. |
| E | 3 | cook | Pat the shrimp very dry with paper towels. |
| E | 4 | cook | Heat a wok or large skillet on high for 2 min. Add the avocado oil, then the mushrooms, and leave them alone 2 min to brown. |
| E | 5 | cook | Add the snap peas, bok choy and scallion whites. Stir-fry 2 min. |
| E | 6 | cook | Push the vegetables aside. Lay the shrimp flat in the pan: 1 min, flip, 1 min more, until pink and curled into a loose C (a tight O means overcooked). |
| E | 7 | cook | Stir the sauce again (the cornstarch settles), pour it in and toss 30–60 s until glossy. |
| E | 8 | cook | Off the heat, add the sesame oil and scallion greens. Serve over the rice. |
| F | 1 | cook | Bring 2 quarts of water and the pasta salt to a boil, covered. |
| F | 2 | cook | Heat a nonstick skillet over medium-high for 2 min and mist with oil spray. Add the beef, press it into one flat layer, salt it, and don't touch it for 3 min, until the bottom is deep brown. Break it up and cook 1 min more. |
| F | 3 | cook | Add the mushrooms. Cook 4–5 min, stirring now and then, until their liquid cooks off and they brown. |
| F | 4 | cook | Push everything aside, put the tomato paste on the bare spot and stir it 1–2 min until it turns a shade darker. Add the garlic, oregano and chili flakes for 30 s. |
| F | 5 | cook | Stir in the marinara and balsamic. Simmer on low for 10 min, stirring now and then. |
| F | 6 | cook | Meanwhile, cook the pasta 1 min less than the package says. Save ¼ cup of the pasta water, then drain. |
| F | 7 | cook | Toss the pasta in the sauce for 1 min, adding a splash of pasta water if it's thick. |
| F | 8 | cook | Top with the parmesan and basil. |
| G | 1 | serve | Microwave the chicken with the lid ajar and a splash of water, 60–90 s, until hot. It's also good cold. |
| G | 2 | serve | Dress the salad now with the vinegar, oregano and a pinch of salt, and toss. |
| G | 3 | serve | Warm the pita 30 s per side in a dry pan, or in the toaster. |
| G | 4 | serve | Add the tzatziki and feta. Tear the pita to scoop. |
| G | 1 | cook | The night before: pat the chicken dry, salt every side and leave it uncovered on a plate in the fridge. |
| G | 2 | cook | Heat the air fryer to 400°F. Mist the chicken with oil spray, then coat it with the oregano, paprika, garlic powder, lemon zest and pepper. |
| G | 3 | cook | Air-fry 10 min, flip, then 6–10 min more until it reads 165°F. Rest 5 min, then slice. |
| G | 4 | cook | Toss the cucumber, tomatoes and onion with the vinegar, oregano and salt. |
| G | 5 | cook | Warm the pita 30 s per side in a dry pan, or in the toaster. |
| G | 6 | cook | Plate the chicken, salad, tzatziki and feta. Tear the pita to scoop. |

## Sauces

`servings` is how many servings one batch makes; meal prep makes whole or half batches to cover the days ahead. `0` means it's made fresh inside a recipe.

| sauce | makes | serving | servings | keeps | time | kcal | note |
|---|---|---|---|---|---|---|---|
| Tzatziki | about 1⅓ cups | ⅓ cup | 4 | 4 days | 15 min + 30 min chill | ~45 kcal and 5 g protein per serving | For the Greek chicken plate (G). |
| Lemon-garlic yogurt sauce | about 1 cup | 2½ tbsp | 6 | 4 days | 5 min | ~25 kcal and 4 g protein per serving | For the lemon-herb chicken bowl (A). |
| Lime crema | about ½ cup | 2 tbsp | 4 | 4 days | 3 min | ~20 kcal and 3 g protein per serving | For the burrito bowl (B). |
| Pico de gallo | about 1¼ cups | ¼ cup | 4 | 3 days | 10 min | ~15 kcal per serving | For the burrito bowl (B). |
| Quick-pickled red onion | a pint jar, about 1½ cups | 3 tbsp | 8 | 2 weeks | 5 min + 30 min | ~5 kcal per serving | For the steak tacos (D). |
| Green herb sauce | about ¾ cup | 2 tbsp | 6 | 5 days | 5 min | ~45 kcal per serving | Swap for the A sauce. Skip the broccoli oil when you use it. |
| Ginger-scallion sauce | about 6 tbsp | 1½ tbsp | 4 | 5 days | 5 min | ~30 kcal per serving | Swap for the A sauce. Skip the broccoli oil when you use it. |
| Miso glaze | enough for 1 fillet | all of it | 0 | make fresh | 2 min | ~55 kcal | Made inside the salmon recipe (C). |
| Stir-fry sauce | enough for 1 stir-fry | all of it | 0 | make fresh | 2 min | ~45 kcal | Made inside the shrimp recipe (E). |

## Sauce ingredients

One batch of each sauce, in the same columns as Ingredients. `buy` and `section` feed the grocery list.

| sauce | qty | unit | item | buy | section |
|---|---|---|---|---|---|
| Tzatziki | 0.5 | each | English cucumber (about 6 oz), skin on | English cucumber | Produce |
| Tzatziki | 0.25 | tsp | kosher salt, for the cucumber | - | Staple |
| Tzatziki | 1 | cup | 0% plain Greek yogurt | Greek yogurt | Dairy |
| Tzatziki | 1 | each | small garlic clove{s}, finely grated | - | Staple |
| Tzatziki | 1 | tbsp | lemon juice | lemon juice | Produce |
| Tzatziki | 0.5 | tsp | lemon zest | lemon zest | Produce |
| Tzatziki | 1 | tbsp | fresh dill, chopped (or 1 tsp dried dill) | dill | Produce |
| Tzatziki | 1 | tsp | extra-virgin olive oil | olive oil | Pantry |
| Tzatziki | 0.125 | tsp | black pepper | - | Staple |
| Lemon-garlic yogurt sauce | 0.75 | cup | 0% plain Greek yogurt | Greek yogurt | Dairy |
| Lemon-garlic yogurt sauce | 2 | tsp | lemon zest | lemon zest | Produce |
| Lemon-garlic yogurt sauce | 1.5 | tbsp | lemon juice | lemon juice | Produce |
| Lemon-garlic yogurt sauce | 1 | each | small garlic clove{s}, finely grated | - | Staple |
| Lemon-garlic yogurt sauce | 0.25 | tsp | kosher salt | - | Staple |
| Lemon-garlic yogurt sauce | 0.125 | tsp | black pepper | - | Staple |
| Lemon-garlic yogurt sauce | 1 | tbsp | water, plus more to thin | - | Staple |
| Lime crema | 0.5 | cup | 0% plain Greek yogurt | Greek yogurt | Dairy |
| Lime crema | 0.5 | tsp | lime zest | lime zest | Produce |
| Lime crema | 1 | tbsp | lime juice | lime juice | Produce |
| Lime crema | 0.125 | tsp | kosher salt | - | Staple |
| Lime crema | 2 | tsp | water, to thin | - | Staple |
| Pico de gallo | 2 | each | Roma tomato{es}, seeded, ¼-inch dice | Roma tomatoes | Produce |
| Pico de gallo | 0.25 | cup | red onion, finely diced | red onion | Produce |
| Pico de gallo | 0.25 | cup | cilantro, chopped (leaves and tender stems) | cilantro | Produce |
| Pico de gallo | 1 | tbsp | lime juice | lime juice | Produce |
| Pico de gallo | 0.25 | tsp | kosher salt | - | Staple |
| Pico de gallo | 0.5 | each | jalapeño{s}, seeded and minced (optional) | jalapeño | Produce |
| Quick-pickled red onion | 1 | each | medium red onion{s}, halved and sliced ⅛ inch thin | red onion | Produce |
| Quick-pickled red onion | 0.5 | cup | white vinegar (or apple cider vinegar) | white vinegar | Pantry |
| Quick-pickled red onion | 0.5 | cup | warm water | - | Staple |
| Quick-pickled red onion | 1 | tsp | sugar | sugar | Pantry |
| Quick-pickled red onion | 1 | tsp | kosher salt | - | Staple |
| Green herb sauce | 1 | cup | flat-leaf parsley, packed (leaves and tender stems) | parsley | Produce |
| Green herb sauce | 0.5 | cup | cilantro, packed | cilantro | Produce |
| Green herb sauce | 1 | each | garlic clove{s} | - | Staple |
| Green herb sauce | 3 | tbsp | red wine vinegar | red wine vinegar | Pantry |
| Green herb sauce | 2 | tbsp | olive oil | olive oil | Pantry |
| Green herb sauce | 3 | tbsp | water | - | Staple |
| Green herb sauce | 0.25 | tsp | chili flakes | - | Staple |
| Green herb sauce | 0.25 | tsp | kosher salt | - | Staple |
| Ginger-scallion sauce | 4 | each | scallion{s}, finely chopped | scallions | Produce |
| Ginger-scallion sauce | 1 | tbsp | fresh ginger, finely grated | ginger | Produce |
| Ginger-scallion sauce | 1 | tbsp | rice vinegar | rice vinegar | Pantry |
| Ginger-scallion sauce | 1 | tbsp | low-sodium soy sauce | low-sodium soy sauce | Pantry |
| Ginger-scallion sauce | 2 | tsp | avocado oil | avocado oil | Pantry |

## Sauce steps

| sauce | step | text |
|---|---|---|
| Tzatziki | 1 | Grate the cucumber on the large holes of a box grater, skin on. No need to seed it. |
| Tzatziki | 2 | Toss it with the salt in a strainer and let it sit 10 min. |
| Tzatziki | 3 | Squeeze it dry: pile it in a clean dish towel or a double layer of paper towels and wring it hard over the sink until it stops dripping. This is what keeps tzatziki thick instead of watery. |
| Tzatziki | 4 | In a bowl, stir together the yogurt, squeezed cucumber, garlic, lemon juice, lemon zest, dill, olive oil and pepper. |
| Tzatziki | 5 | Taste it. If it's flat, add a pinch of salt or a squeeze of lemon. |
| Tzatziki | 6 | Cover and chill at least 30 min so the garlic mellows. Keep it in a sealed jar and stir before serving. |
| Lemon-garlic yogurt sauce | 1 | Zest the lemon first (it's hard to zest once it's cut), then juice it. |
| Lemon-garlic yogurt sauce | 2 | Whisk the yogurt, zest, lemon juice, garlic, salt and pepper in a bowl. |
| Lemon-garlic yogurt sauce | 3 | Whisk in the water 1 tbsp at a time until it drizzles like ranch. |
| Lemon-garlic yogurt sauce | 4 | Taste for salt and lemon, then jar it. |
| Lime crema | 1 | Zest the lime, then juice it. |
| Lime crema | 2 | Whisk the yogurt, zest, juice and salt. Add water until it drizzles, then jar it. |
| Pico de gallo | 1 | Halve the tomatoes and scoop out the seeds and juice with a spoon so the pico isn't watery. Dice ¼ inch. |
| Pico de gallo | 2 | Dice the onion fine, put it in a strainer and rinse it under cold water for 10 s. This takes the harsh raw bite off. |
| Pico de gallo | 3 | Stir together the tomato, onion, cilantro, jalapeño (if using), lime juice and salt. |
| Pico de gallo | 4 | Let it sit 10 min, tip off any liquid, then jar it. |
| Quick-pickled red onion | 1 | Slice the onion as thin as you can and pack it into a pint jar. |
| Quick-pickled red onion | 2 | Stir the vinegar, warm water, sugar and salt until dissolved (30 s in the microwave helps). |
| Quick-pickled red onion | 3 | Pour it over the onion and press the onion down so it's covered. |
| Quick-pickled red onion | 4 | Leave it on the counter 30 min (it turns bright pink), then refrigerate. |
| Green herb sauce | 1 | Put everything in a blender or mini food processor. |
| Green herb sauce | 2 | Blend 30–45 s until smooth, scraping down once. Add 1 tbsp more water if it won't move. |
| Green herb sauce | 3 | Taste for salt and vinegar, then jar it. |
| Ginger-scallion sauce | 1 | Put the scallions and ginger in a heatproof bowl. |
| Ginger-scallion sauce | 2 | Heat the oil in a small pan until it shimmers (about 1 min) and pour it over. It should sizzle. |
| Ginger-scallion sauce | 3 | Stir in the vinegar and soy, then jar it. |

## Chef tricks

| n | trick |
|---|---|
| 1 | Dry-brine the chicken the night before: ¾ tsp Morton kosher salt per lb (1¼ tsp if it's Diamond Crystal), every side, uncovered in the fridge. |
| 2 | Stop at 165°F. Use an instant-read thermometer. Overcooking is why prep chicken tastes dry. |
| 3 | Get color: pat food dry, use a single layer, air-fry at 400°F. |
| 4 | Add acid when you eat, not when you prep. Lemon, lime or vinegar makes day-4 food taste fresh. |
| 5 | Keep sauces in separate jars and add them at the table. |
| 6 | Toast dry spices for 30 s in a dry pan. |
| 7 | Use almost calorie-free umami: low-sodium soy, miso, tomato paste cooked dark, a little parmesan. |
| 8 | Finish with fresh herbs, citrus zest or scallions. |
| 9 | Reheat with the lid ajar and 1 tbsp water over the rice. |

## Prep sessions

Cooked chicken keeps 3–4 days, so prep happens twice. `brine` is the evening before, when the chicken gets dry-brined.

| day | covers | minutes | time | brine |
|---|---|---|---|---|
| Sun | Sun Mon Tue Wed | 90 | 11:00 AM | Sat |
| Wed | Thu Fri Sat | 45 | 8:00 PM | Tue |

## Prep steps

The meal-prep checklist, in order. A step shows only when this session has something matching `needs`: `A+G/Chicken` means the Chicken rows of meals A and G; `sauces` means sauces to make; `containers` means meals to pack.

In `step`: `**bold**` works; ` ¶ ` starts a new line. `{list:A+G/Chicken}` shows the full ingredient list for that session; `{amt:A+B/Rice/cooked brown rice}` shows one total; `{n:A+G}` counts portions; `{dry:…}`, `{water:…}` and `{pouches:…}` turn cooked rice into dry rice, cooking water and 2-cup microwave pouches.

| needs | step |
|---|---|
| A+B/Rice | **Start the rice first; it takes the longest.** You need {amt:A+B/Rice/cooked brown rice} cooked, which is {dry:A+B/Rice/cooked brown rice} dry brown rice. ¶ Rice cooker: rinse it, add water to the brown-rice line, use the brown-rice setting. ¶ Stovetop: rinse it, add {water:A+B/Rice/cooked brown rice} water and ¼ tsp salt, bring to a boil, cover, turn to the lowest heat for 45 min, then leave it off the heat 10 min with the lid on. ¶ Shortcut: {pouches:A+B/Rice/cooked brown rice} of brown rice (2 cups each), 90 s each. |
| A+B+G/Chicken | **Heat the air fryer to 400°F** and take last night's brined chicken out of the fridge. Any breast thicker than 1 inch: slice it in half horizontally so every piece is ¾–1 inch thick and cooks evenly. |
| A+G/Chicken | **Lemon-herb chicken ({n:A+G}):** mix the spices in a small bowl. Mist the chicken with oil spray and coat every side. {list:A+G/Chicken} |
| B/Chicken | **Cumin-lime chicken ({n:B}):** toast the cumin in a dry pan over medium heat for 30–60 s, until it smells nutty. Mix it with the other spices and coat the chicken. {list:B/Chicken} |
| A+B+G/Chicken | **Air-fry the chicken** at 400°F in a single layer with space around each piece, in batches if needed (both flavors can share the basket): 10 min, flip, then 6–10 min more until the thickest part reads 165°F. Let it rest on a board while you do the rest. |
| sauces | **Make the sauces** while the chicken cooks. Each one goes in its own jar and stays separate until you eat. |
| A/Broccoli | **Broccoli:** toss everything together and air-fry at 400°F for 8–10 min, shaking halfway, until the edges char. {list:A/Broccoli} |
| B/Beans | **Black beans:** rinse and drain, then warm them in a small pot over medium heat for 3–4 min with the spices and water. {list:B/Beans} |
| A/Rice | **Bowl rice (for A):** when the rice is done, measure it into a bowl and stir in the rest. {list:A/Rice} |
| B/Rice | **Cilantro-lime rice (for B):** measure it into a second bowl and stir in the rest. {list:B/Rice} |
| G/Greek salad | **Greek salad (for G):** chop it and pack it undressed so it stays crisp. {list:G/Greek salad} |
| B/Romaine | **Romaine (for B):** wash, dry well and chop. {list:B/Romaine} |
| D/Slaw | **Taco slaw (for the taco nights ahead):** shred the cabbage thin, or use bagged coleslaw mix. Keep it dry in a zip bag; you dress it when you cook. {list:D/Slaw} |
| A+B+G/Chicken | **Slice the chicken** across the grain into ½-inch strips. Split each flavor evenly between its containers, about 5¼ oz cooked each. |
| containers | **Pack the containers** using the list below. Let the food cool 15–20 min uncovered, then lid it and refrigerate within 2 hours of cooking. |

## Store units

How recipe amounts become grocery amounts. `ingredient` and `unit` match the `buy` name and unit in Ingredients, Sauce ingredients, Daily groceries and Refill extras. `factor` converts to `store_unit`; `round` rounds up to that step.

| ingredient | unit | buy_as | factor | store_unit | round | note |
|---|---|---|---|---|---|---|
| chicken breast | oz | chicken breast, boneless skinless | 0.0625 | lb | 0.25 |  |
| wild salmon | oz | wild salmon fillets | 0.0625 | lb | 0.25 | 6-oz fillets |
| top sirloin | oz | top sirloin steak | 0.0625 | lb | 0.25 |  |
| shrimp | oz | raw shrimp, peeled and deveined | 0.0625 | lb | 0.25 | Frozen is fine. Thaw overnight in the fridge. |
| 95% lean ground beef | oz | 95% lean ground beef | 0.0625 | lb | 1 | 1-lb packs |
| brown rice, cooked | cup | brown rice (dry) | 0.334 | cup | 0.25 | 1 cup dry makes about 3 cups cooked. Or microwave pouches, about 2 cups each. |
| jasmine rice, cooked | cup | jasmine rice microwave pouches | 0.5 | pouch | 1 | About 2 cups each |
| broccoli | cup | broccoli crowns | 0.2 | lb | 0.25 | 1 lb is about 5 cups of florets |
| Yukon Gold potatoes | oz | Yukon Gold potatoes | 0.0625 | lb | 0.25 |  |
| asparagus | oz | asparagus | 0.0625 | bunch | 1 | About 1 lb per bunch |
| snap peas | cup | snap peas | 3.5 | oz | 8 | 8-oz bags |
| mushrooms | cup | cremini mushrooms | 2.5 | oz | 8 | 8-oz packs |
| cabbage | cup | green cabbage | 0.0833 | head | 0.5 | Or a 14-oz bag of coleslaw mix |
| romaine | cup | romaine hearts | 0.25 | each | 1 | About 4 cups chopped per heart |
| English cucumber | cup | English cucumber | 0.333 | each | 1 |  |
| cherry tomatoes | cup | cherry tomatoes | 0.5 | pint | 1 |  |
| red onion | tbsp | red onions | 0.0625 | each | 1 |  |
| red onion | each | red onions | 1 | each | 1 |  |
| lemon | each | lemons | 1 | each | 1 |  |
| lemon juice | tbsp | lemons | 0.333 | each | 1 |  |
| lemon zest | tsp | lemons | 0.333 | each | 1 |  |
| lime | each | limes | 1 | each | 1 |  |
| lime juice | tbsp | limes | 0.5 | each | 1 |  |
| lime zest | tsp | limes | 0.5 | each | 1 |  |
| cilantro | tbsp | cilantro | 0.0625 | bunch | 1 |  |
| parsley | cup | flat-leaf parsley | 1 | bunch | 1 |  |
| dill | tbsp | fresh dill | 0.25 | pack | 1 | Small clamshell |
| basil | each | fresh basil | 0.05 | pack | 1 | Small clamshell |
| scallions | each | scallions | 0.15 | bunch | 1 |  |
| ginger | tsp | fresh ginger | 0.1 | piece | 1 | A 3-inch piece |
| avocado | each | avocados | 1 | each | 1 |  |
| black beans | cup | black beans (15-oz can) | 0.667 | can | 1 |  |
| Greek yogurt | cup | 0% plain Greek yogurt | 1 | cup | 0.5 | A 32-oz tub is about 3½ cups |
| cotija | tbsp | cotija | 0.25 | oz | 1 |  |
| feta | tbsp | feta | 0.25 | oz | 1 |  |
| parmesan | tbsp | parmesan | 0.2 | oz | 1 |  |
| dry pasta | oz | short pasta | 1 | oz | 1 | A 1-lb box lasts 8 dinners |

## Pantry staples

Spices and basics every recipe uses. They show under "check stock" on the grocery list.

| item |
|---|
| kosher salt (Morton) |
| black pepper |
| garlic (fresh heads) |
| garlic powder |
| smoked paprika |
| ground cumin |
| chili powder |
| dried oregano |
| dried rosemary |
| chili flakes |
| olive-oil spray |

## Daily groceries

Fixed items, counted per day. `when` uses the same words as the Checklist. `item` is the grocery name, matched against Store units.

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
| romaine | 1.5 | cup | home dinner | Produce |
| lemon | 0.25 | each | home dinner | Produce |

## Side salad

Served with every home dinner.

| qty | unit | item |
|---|---|---|
| 1.5 | cup | romaine, chopped |
| 0.25 | each | lemon, squeezed over |
|  |  | a pinch of salt |

## Refill extras

Added on each refill day for about +150 g carbs.

| item | qty | unit | section | note |
|---|---|---|---|---|
| jasmine rice, cooked | 2 | cup | Grains | ~85 g carbs, split between lunch and dinner |
| Yukon Gold potatoes | 7 | oz | Produce | ~35 g carbs |
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
