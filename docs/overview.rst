F5 Beacon Overview
==================

In this section we will review the different concepts and pages within the Beacon portal. You will notice many of the objects created during the `lab setup` portion of this lab.

.. NOTE:: If you have existing applications or configuered objects with Beacon, your portal may appear slightly different than this guides examples.


Section Summary:
   - **Application Landscape:** The application inventory within beacon (map/list view).
      - **Application Detail:** Create, modify, and view health and events of your applications.
   - **Configuration:** Create synthetic monitors, data ingest tokens, manage data sources, integrate information.
   - **Insights:** Visualize, Analyze, and Correlate data metrics ingested into Beacon. 
   - **Dashboards:** Group insights, applications, and Beacon data into single view dashboards.


Navigate to the |Portal| and login using your F5 Cloud Services account. This link will take you directly to the Beacon service within the portal.

Application Landscape
---------------------

#. After logging in, you will land on the **Application Landscape** page within F5 Beacon. This section will display your current application inventory in either a **Map View** or a **List View**. These views align to the tabs at the top of the page.

   |app_landscape|

#. On the current Map, you will see the **1** badge over Seattle. This represents the **Bacon** application that the `lab setup` section created. If you hover over the badge, you will notice that the application is currently **Healthy**.

   Clicking on the badge will take you to the **List View** tab. Navigating to this page by clicking a badge will filter the list of applications to those that match the location that you selected. Go ahead and click the badge.

   |hover_app|

#. Click the name of the **Bacon** application to navigate to the details page of this application.

   |app_name|

#. On this page there are a number of tabs across the top that display different information about the curent application. Feel free to click through these tabs and look around.

   - **Application Map:** The dependency map of your application components.
   - **JSON Configuration:** The declarative API payload needed to create the current application. Note that the JSON is also editable directly in the portal.
   - **Health & Events:** The health history of the application along with an event history.
   - **Insights:** Insights associated with the current application as well as a column identifying which specific component within the application the insight is associated with.
   - **Properties:** Meta-data properties/labels associated with the top level component of the application.

   |
   We will be leveraging these different tabs throughout the lab as more data and events occur.

#. Now let's review the **Application Map** tab a bit more. Make sure to navigate back to it.

Configuration
-------------


Insights
--------


Dashboards
----------

TODO

.. |app_landscape| image:: images/overview/app_landscape.png
.. |hover_app| image:: images/overview/hover_app.png
.. |app_name| image:: images/overview/app_name.png

.. |Portal| raw:: html

   <a href="https://portal.cloudservices.f5.com/beacon" target="_blank">F5 Beacon Portal</a>