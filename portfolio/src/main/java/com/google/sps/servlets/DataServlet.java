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

  // List that will store info about me
  private ArrayList<String> infoAboutMe = new ArrayList<String>();
  // Internal list that will store user comments
  private ArrayList<String> userComments = new ArrayList<String>();
  // Our internal Gson object
  private Gson gson = new Gson();
  
  // This function runs whenever the /data url is requested. 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Populate list
    infoAboutMe.add("My name is Awad.");
    infoAboutMe.add("I'm 19 years old.");
    infoAboutMe.add("I'm a STEP Intern for Google.");
    String jsonInfo = convertToJsonUsingGson();
    // Sends Json as the response
    response.setContentType("application/json;");
    response.getWriter().println(jsonInfo);
    infoAboutMe.clear();
  }

  // This function handles user comments whenever the user hits the "submit" button the webpage.
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String text = request.getParameter("text-input");
    userComments.add(text);
    // Print contents on data page
    response.setContentType("text/html;");
    response.getWriter().println(userComments);
  }

  // Converts our array to json format using gson library
  private String convertToJsonUsingGson(){
    return gson.toJson(infoAboutMe);
  }


}
