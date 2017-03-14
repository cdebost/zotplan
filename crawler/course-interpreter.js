import assert from 'assert';

export default (departmentName, data) => {
  Object.values(data).forEach((course) => {
    if (course.prerequisite) {
      course.prerequisite = resolveRequirements(course.prerequisite, departmentName);
    }
    if (course.corequisite) {
      course.corequisite = resolveRequirements(course.corequisite, departmentName);
    }
  });
  return data;
};

function resolveRequirements(string, departmentName) {
  const tokens = tokenizeRequisiteString(string);
  try {
    validateRequisiteTokens(tokens);
  } catch (e) {
    throw new Error(`Malformed requirement in department ${departmentName}: ${e.message}`);
  }
  return buildRequisiteGroupTree(tokens);
}

function tokenizeRequisiteString(string) {
  return string.split(/(\(|\)| or | and )/).map(t => t.trim()).filter(t => t.length);
}

function isTokenCombiner(token) {
  return token === 'or' || token === 'and';
}

function validateRequisiteTokens(tokens) {
  let openParen = 0;
  let closeParen = 0;

  for (let i = 0; i < tokens.length; ++i) {
    const token = tokens[i];
    switch (token) {
      case '(':
        openParen++;
        assert(i === 0 || isTokenCombiner(tokens[i - 1]) || tokens[i - 1] === '(',
          `'(' token must be preceded by nothing, a combiner, or another '(',
          but was preceded by ${tokens[i - 1]}`);
        break;
      case ')':
        closeParen++;
        assert(i > 0, "')' token cannot appear first");
        assert(!isTokenCombiner(tokens[i - 1]), "')' cannot be preceded by a combiner");
        break;
      case 'and':
      case 'or':
        assert(i >= 0, `'${token}' token cannot appear first`);
        assert(!isTokenCombiner(tokens[i - 1]),
          `'${token}' token must be preceded by a non-combiner token,
          but was preceded by ${tokens[i - 1]}`);
        break;
      default:
        assert(i === 0 || isTokenCombiner(tokens[i - 1]) || tokens[i - 1] === '(',
          `Generic course token '${token}' must be preceded by nothing, a combiner,
          or an open group, but was preceded by ${tokens[i - 1]}`);
        break;
    }
  }

  assert(openParen === closeParen,
    `Number of close parentheses and open parentheses must be equal
    (${openParen} vs ${closeParen})`);
}

function buildRequisiteGroupTree(tokens) {
  let left;
  let combiner;
  let token;
  while ((token = tokens.shift())) {
    let node;
    if (token === 'and' || token === 'or') {
      if (!combiner || combiner.type !== token) {
        combiner = nodeForCombiner(token, [left]);
      }
    } else {
      if (token === '(') {
        const groupTokens = [];
        let embeddedGroups = 0;
        while ((token = tokens.shift())) {
          if (token === '(') {
            embeddedGroups++;
          } else if (token === ')') {
            embeddedGroups--;
            if (embeddedGroups < 0) {
              break;
            }
          }
          groupTokens.push(token);
        }
        node = buildRequisiteGroupTree(groupTokens);
      } else {
        node = nodeForCourse(token);
      }
      if (combiner) {
        combiner.children.push(node);
        left = combiner;
      } else {
        left = node;
      }
    }
  }
  return left;
}

function nodeForCourse(courseId) {
  return {
    type: 'course',
    value: courseId,
    toString() { return this.value; },
  };
}

function nodeForCombiner(type, children) {
  return {
    type,
    children,
    toString() { return `(${children.join(` ${type} `)})`; },
  };
}
