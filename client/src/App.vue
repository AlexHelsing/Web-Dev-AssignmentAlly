<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">LOGO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="test" to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item to="/meetings">Meetings</b-nav-item>
          <b-nav-item to="/tasks">Tasks</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>Username</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div class="main">
      <div class="section">
        <h1 class="section-title">Assignment Group</h1>
        <div class="section-content-1">
          <b-card title="Card Title" img-alt="Image" img-top>
            <b-card-text>
              asdfasdf
            </b-card-text>
          </b-card>
          <b-card title="Card Title" img-alt="Image" img-top>
            <b-card-text>
              asdf
            </b-card-text>
          </b-card>
          <b-card title="Card Title" img-alt="Image" img-top>
            <b-card-text>
              ff
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div class="section">
        <h1 class="section-title">Scheduled Meetings</h1>
        <div class="section-content-2">
          <div class="meeting-item">
            <p class="course">Software Arch A1 </p>
            <span class="rightside">
              <p class="label">ZOOM</p>
              <p class="date">3 Aug 13.00</p>
            </span>
          </div>
          <div class="meeting-item">
            <p class="course">Software Arch A1 </p>
            <span class="rightside">
              <p class="label">ZOOM</p>
              <p class="date">3 Aug 13.00</p>
            </span>
          </div>
        </div>
      </div>

      <div class="section">sec</div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.section {
  color: blueviolet;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.section-title {
  color: white;
  font-size: 2em;
  margin: 0;
}

.section-content-1 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding-top: 6px;
  grid-gap: 10px;
}

.section-content-2 {
  display: flex;
  flex-direction: column;

}

.meeting-item {
  background-color: turquoise;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.label {
  color: black;
  background-color: lightgreen;
  padding: 5px;
  border-radius: 50px;
  margin-right: 10px;

}

.rightside {
  display: flex;

  justify-content: space-between;
}
</style>
