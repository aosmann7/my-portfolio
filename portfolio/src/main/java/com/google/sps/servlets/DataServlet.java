// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  // Our internal Gson object
  private Gson gson = new Gson();
  
  // This function runs whenever the /data url is requested. 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Gets comments from datastore
    Query query = new Query("Comment").addSort("timestamp", SortDirection.ASCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    // Our list of comments.
    ArrayList<String> userComments = new ArrayList<String>();
    for (Entity entity : results.asIterable()) {
      String userComment = (String) entity.getProperty("comment");
      // Check if the entity already has the comment to avoid printing comments more than it should.
      if (!userComments.contains(userComment)){
        userComments.add(userComment);
      }
    }
    // Converts our arraylists to Json format
    String jsonUserComments = convertToJsonUsingGson(userComments);
    // Sends Json as the response
    response.setContentType("application/json;");
    response.getWriter().println(jsonUserComments);
  }

  // This function handles user comments whenever the user hits the "submit" button on the webpage.
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String text = request.getParameter("text-input");
    long timestamp = System.currentTimeMillis();
    // Creates our comment entity within datastore
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("comment", text);
    commentEntity.setProperty("timestamp", timestamp);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);
    // Send the user back to the page after submitting a comment
    response.sendRedirect("/index.html");
  }

  // Converts our array to json format using gson library
  private String convertToJsonUsingGson(ArrayList<String> info){
    return gson.toJson(info);
  }

  /**
   * Gets the data associated with the given parameter, null if parameter is not found
   */
   /*
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
  */
}