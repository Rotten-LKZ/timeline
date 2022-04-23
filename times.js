/**
 * Times
 * Just need to declare a variable times
 * This variable is an array of objects
 * Each object has two properties:
 * - time: the time of the event in the format of '[-]YYYY[BC | AD][.MM.DD]'
 *        BC or AD means before or after Christ and negative numbers are BC
 *        e.g. '-1234.12.31' '1234BC' '1234.12' '2023AD.12.31'
 * - msg: the message of the event
 */

const times = [
  { time: '2020', msg: 'Two years ago' },
  { time: '2021', msg: 'One year ago' },
  { time: '2022.4.20', msg: 'Got the idea for the first time' },
  { time: '2022.4.22', msg: 'Try archieving the idea' },
  { time: '2022.4.23', msg: 'Complete first version' },
  { time: '2023', msg: 'What I will be' },
]