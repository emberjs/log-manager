import { isParentOf } from "utils";

module('utils');

test("#isParentOf", function() {
  ok(isParentOf('router', 'router.transition'), "router is parent of router.transition");
  ok(isParentOf('router', 'router.transition.beforeModel'), "router is parent of router.transition.beforeModel");
  ok(isParentOf('router.transition', 'router.transition.beforeModel'), "router.transition is parent of router.transition.beforeModel");
  ok(!isParentOf('router', 'run-loop'), "router is not parent of run-loop");
  ok(!isParentOf('router.model', 'router.transition'), "router.model is not parent of router.transition");
});
