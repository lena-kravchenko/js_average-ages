'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const centuryMen = people.filter(person =>
    Math.ceil(person.died / 100) === century && person.sex === 'm');

  const menToFilter = (arguments.length > 1) ? centuryMen : men;

  const result = menToFilter.reduce((sum, person) =>
    sum + person.died - person.born, 0) / menToFilter.length;

  return +result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenWhoHaveChildren = people.filter(mother =>
    people.some(child => child.mother === mother.name));

  const womenToFilter = (arguments.length > 1) ? womenWhoHaveChildren : women;

  const result = womenToFilter.reduce((sum, person) =>
    sum + person.died - person.born, 0) / womenToFilter.length;

  return +result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => people.some(child =>
    child.name === person.mother));

  const sons = people.filter(person => people.some(child =>
    child.name === person.mother) && person.sex === 'm');

  const mothersToFilter = (arguments.length > 1) ? sons : children;

  const ages = mothersToFilter.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const result = ages.reduce((sum, age) =>
    sum + age, 0) / ages.length;

  return +result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
