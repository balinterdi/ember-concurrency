import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  status: null,

// BEGIN-SNIPPET start-task-example
  myTask: task(function * (msg) {
    let status = `myTask.perform("${msg || "init"}")...`;
    this.set('status', status);

    yield timeout(500);
    this.set('status', `${status} Done`);
  }).on('init', 'foo'),

  actions: {
    performTask(msg) {
      // This demonstrates how you can .get() a reference
      // to a task and then run it with .perform(), but
      // ideally you should just invoke myTask directly
      // from the template using the `perform` helper.
      this.get('myTask').perform(msg);
    },
    triggerFoo(msg) {
      this.trigger('foo', msg);
    }
  }
// END-SNIPPET
});

