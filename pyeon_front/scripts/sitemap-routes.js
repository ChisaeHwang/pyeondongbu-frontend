import React from "react";
import { Route } from "react-router-dom";

// 현재 라우트 + 향후 추가될 수 있는 라우트들
export default (
  <Route>
    <Route path="/" />
    <Route path="/jobs" />
    <Route path="/jobs/:id" />
    <Route path="/notices" />
    <Route path="/notices/:id" />
    <Route path="/terms" />
    <Route path="/privacy" />
    <Route path="/contact" />
  </Route>
);
