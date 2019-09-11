const { module, test } = QUnit;

import { setComponentManager, getComponentManager } from '..';

module('component managers', () => {
  test('setting and getting', assert => {
    const managerA = {} as any;
    const managerAAB = {} as any;

    class A {}
    setComponentManager(A, managerA);
    class AA extends A {}
    class AB extends A {}
    class AAA extends AA {}
    class AAB extends AA {}
    setComponentManager(AAB, managerAAB);

    class B {}
    class BA {}

    assert.strictEqual(
      getComponentManager(A),
      managerA,
      'class A returns explicitly associated manager'
    );

    assert.strictEqual(
      getComponentManager(AA),
      managerA,
      'class AA returns inherited manager from parent'
    );

    assert.strictEqual(
      getComponentManager(AB),
      managerA,
      'class AA returns inherited manager from parent'
    );

    assert.strictEqual(
      getComponentManager(AAA),
      managerA,
      'class AAA returns inherited manager from grandparent'
    );

    assert.strictEqual(
      getComponentManager(AAB),
      managerAAB,
      'class AAA returns explicitly associated manager'
    );

    assert.strictEqual(
      getComponentManager(AAB),
      managerAAB,
      'class AAA returns explicitly associated manager'
    );

    assert.strictEqual(getComponentManager(B), null, 'class B returns null manager');

    assert.strictEqual(getComponentManager(BA), null, 'class BA returns null manager');
  });
});
