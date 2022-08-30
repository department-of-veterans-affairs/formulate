import { transformJSONSchema } from '../../src/utils/helpers';
import { StringifyFormReplacer } from '../../src/utils/helpers'

// describe('Helpers - buildPath', () => {
//   test('It returns expected results', () => {
//     const result1 = buildPath('/chapter-one', '/page-one');
//     const expectedResult1 = '/chapter-one/page-one';
//     expect(result1).toEqual(expectedResult1);

//     const result2 = buildPath('chapter-one', 'page-one');
//     const expectedResult2 = 'chapter-one/page-one';
//     expect(result2).toEqual(expectedResult2);

//     const result3 = buildPath('/chapter-one/', '/page-one/', '/');
//     const expectedResult3 = '/chapter-one/page-one';
//     expect(result3).toEqual(expectedResult3);

//     const result4 = buildPath('');
//     const expectedResult4 = '';
//     expect(result4).toEqual(expectedResult4);

//     const result5 = buildPath('//a', '', '/', '/b/');
//     const expectedResult5 = '//a/b';
//     expect(result5).toEqual(expectedResult5);

//     const result6 = buildPath('https://google.com/', 'my', 'path');
//     const expectedResult6 = 'https://google.com/my/path';
//     expect(result6).toEqual(expectedResult6);
//   });
// });

// describe('Helpers - buildRelativePath', () => {
//   test('It returns expected results', () => {
//     const result1 = buildRelativePath('/chapter-one', '/page-one');
//     const expectedResult1 = '/chapter-one/page-one';
//     expect(result1).toEqual(expectedResult1);

//     const result2 = buildRelativePath('chapter-one', 'page-one');
//     const expectedResult2 = '/chapter-one/page-one';
//     expect(result2).toEqual(expectedResult2);

//     const result3 = buildRelativePath('/chapter-one/', '/page-one/', '/');
//     const expectedResult3 = '/chapter-one/page-one';
//     expect(result3).toEqual(expectedResult3);

//     const result4 = buildRelativePath('');
//     const expectedResult4 = '/';
//     expect(result4).toEqual(expectedResult4);

//     const result5 = buildRelativePath('//a', '', '/', '/b/');
//     const expectedResult5 = '//a/b';
//     expect(result5).toEqual(expectedResult5);
//   });
// });

describe('Helpers - JSON Schema', () => {
  test('It transforms primitive type properties', () => {
    const schemaToTest = {
      properties: {
        booleanProperty: {
          type: 'boolean'
        },
        numberProperty: {
          type: 'number'
        },
        stringProperty: {
          type: 'string'
        },
      }
    }
    const expectedResult = {
      booleanProperty: undefined,
      numberProperty: undefined,
      stringProperty: undefined,
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It transforms object type properties', () => {
    const schemaToTest = {
      properties: {
        objectProperty: {
          type: 'object',
          properties: {
            prop1: {
              type: 'string'
            },
            prop2: {
              type: 'number'
            }
          }
        }
      }
    }
    const expectedResult = {
      objectProperty: {
        prop1: undefined,
        prop2: undefined
      }
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It transforms array type properties', () => {
    const schemaToTest = {
      properties: {
        arrayProperty: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              prop3: {
                type: 'boolean'
              },
              prop4: {
                type: 'string'
              }
            }
          }
        }
      }
    }
    const expectedResult = {
      arrayProperty: [
        {
          prop3: undefined,
          prop4: undefined
        }
      ]
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It maps properties with primitive type definitions', () => {
    const schemaToTest = {
      definitions: {
        booleanDefinition: {
          type: 'boolean'
        },
        numberDefinition: {
          type: 'number'
        },
        stringDefinition: {
          type: 'string'
        },
      },
      properties: {
        booleanProperty: {
          $ref: '#/definitions/booleanDefinition'
        },
        numberProperty: {
          $ref: '#/definitions/numberDefinition'
        },
        stringProperty: {
          $ref: '#/definitions/stringDefinition'
        },
      }
    }
    const expectedResult = {
      booleanProperty: undefined,
      numberProperty: undefined,
      stringProperty: undefined
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It maps properties with object type definitions', () => {
    const schemaToTest = {
      definitions: {
        fullNameDefinition: {
          type: 'object',
          properties: {
            first: {
              type: 'string'
            },
            middle: {
              type: 'string'
            },
            last: {
              type: 'string'
            },
            suffix: {
              type: 'string'
            },
          }
        }
      },
      properties: {
        fullNameProperty: {
          $ref: '#/definitions/fullNameDefinition'
        }
      }
    }
    const expectedResult = {
      fullNameProperty: {
        first: undefined,
        middle: undefined,
        last: undefined,
        suffix: undefined
      }
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It maps properties with array type definitions', () => {
    const schemaToTest = {
      definitions: {
        filesDefinition: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              size: {
                type: 'string'
              }
            }
          }
        }
      },
      properties: {
        filesProperty: {
          $ref: '#/definitions/filesDefinition'
        }
      }
    }
    const expectedResult = {
      filesProperty: [
        {
          name: undefined,
          size: undefined
        }
      ]
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It maps properties with nested object type definitions', () => {
    const schemaToTest = {
      definitions: {
        dateRangeDefinition: {
          type: 'object',
          properties: {
            from: {
              $ref: '#/definitions/dateDefinition'
            },
            to: {
              $ref: '#/definitions/dateDefinition'
            }
          }
        },
        dateDefinition: {
          type: 'string'
        }
      },
      properties: {
        datesOfServiceProperty: {
          $ref: '#/definitions/dateRangeDefinition'
        }
      }
    }
    const expectedResult = {
      datesOfServiceProperty: {
        from: undefined,
        to: undefined
      }
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It maps array properties with nested array type definitions', () => {
    const schemaToTest = {
      definitions: {
        filesDefinition: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              size: {
                type: 'string'
              }
            }
          }
        }
      },
      properties: {
        filesProperty: {
          type: 'array',
          items: {
            $ref: '#/definitions/filesDefinition'
          }
        }
      }
    }
    const expectedResult = {
      filesProperty: [
        [
          {
            name: undefined,
            size: undefined
          }
        ]
      ]
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('It handles properties with centralMailAddress definitions differently', () => {
    const schemaToTest = {
      definitions: {
        centralMailAddress: {
          type: 'string'
        }
      },
      properties: {
        mailProperty: {
          $ref: '#/definitions/centralMailAddress'
        }
      }
    }
    const expectedResult = {
      mailProperty: {
        isMilitaryBaseOutside: null,
        streetAddress: '',
        streetAddressLine2: '',
        streetAddressLine3: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      }
    }

    const actualResult = transformJSONSchema(schemaToTest);

    expect(actualResult).toEqual(expectedResult);
  });

  test('stringify form replacer', () => {
    const schemaToTest = {
      name: undefined,
      previousName: {
        first: 'Hello',
        last: 'world',
        middle: undefined,
        suffix: undefined
      },
      someRadioButtonValue: "true",
      address: {
        country: 'USA',
        street: '123 Baker St.',
        postalCode: '12345',
        city: 'Heaven'
      },
      address2: {
        country: 'USA',
        street: undefined,
        postalCode: '12345',
        city: 'Heaven'
      }
    }
    const expectedResult = {
      previousName: {
        first: 'Hello',
        last: 'world'
      },
      someRadioButtonValue: true,
      address: {
        country: 'USA',
        street: '123 Baker St.',
        postalCode: '12345',
        city: 'Heaven'
      }
    }

    const actualResult = JSON.stringify(schemaToTest, StringifyFormReplacer);

    expect(JSON.parse(actualResult)).toEqual(expectedResult);
  });
});