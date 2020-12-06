import countValidPassports, { rules } from './part-2.js';

describe('day-04 part-2', () => {
  it('should pass the example values', () => {
    expect(rules.byr('2002')).toBe(true);
    expect(rules.byr('2003')).toBe(false);

    expect(rules.hgt('60in')).toBe(true);
    expect(rules.hgt('190cm')).toBe(true);
    expect(rules.hgt('190in')).toBe(false);
    expect(rules.hgt('190')).toBe(false);

    expect(rules.hcl('#123abc')).toBe(true);
    expect(rules.hcl('#123abz')).toBe(false);
    expect(rules.hcl('123abc')).toBe(false);

    expect(rules.ecl('brn')).toBe(true);
    expect(rules.ecl('wat')).toBe(false);

    expect(rules.pid('000000001')).toBe(true);
    expect(rules.pid('0123456789')).toBe(false);
  });

  it('should return 0 for the given invalid passports', () => {
    const invalidPassports = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

    expect(countValidPassports(invalidPassports)).toBe(0);
  });

  it('should return 4 for the given valid passports', () => {
    const validPassports = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f
    
eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm
    
hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022
    
iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

    expect(countValidPassports(validPassports)).toBe(4);
  });
});
